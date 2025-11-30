const express = require('express');
const { body, validationResult } = require('express-validator');
const { query, transaction } = require('../config/database');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation Error',
      details: errors.array()
    });
  }
  next();
};

// Generate unique invoice number
const generateInvoiceNumber = async () => {
  const year = new Date().getFullYear();
  const prefix = `INV-${year}`;
  
  const lastInvoice = await query(
    'SELECT invoice_number FROM invoices WHERE invoice_number LIKE ? ORDER BY id DESC LIMIT 1',
    [`${prefix}%`]
  );
  
  let sequence = 1;
  if (lastInvoice.length > 0) {
    const lastNumber = parseInt(lastInvoice[0].invoice_number.split('-')[2]);
    sequence = lastNumber + 1;
  }
  
  return `${prefix}-${sequence.toString().padStart(4, '0')}`;
};

// GET /api/invoices - Get all invoices
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, customer_id, company_id, date_from, date_to } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (search) {
      whereClause += ' AND (i.invoice_number LIKE ? OR c.name LIKE ? OR co.name LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (status) {
      whereClause += ' AND i.status = ?';
      params.push(status);
    }

    if (customer_id) {
      whereClause += ' AND i.customer_id = ?';
      params.push(customer_id);
    }

    if (company_id) {
      whereClause += ' AND i.company_id = ?';
      params.push(company_id);
    }

    if (date_from) {
      whereClause += ' AND i.invoice_date >= ?';
      params.push(date_from);
    }

    if (date_to) {
      whereClause += ' AND i.invoice_date <= ?';
      params.push(date_to);
    }

    const invoicesQuery = `
      SELECT i.*, c.name as customer_name, co.name as company_name, u.full_name as created_by_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN companies co ON i.company_id = co.id
      LEFT JOIN users u ON i.created_by = u.id
      ${whereClause}
      ORDER BY i.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN companies co ON i.company_id = co.id
      ${whereClause}
    `;

    const [invoices, totalResult] = await Promise.all([
      query(invoicesQuery, params),
      query(countQuery, params)
    ]);

    res.json({
      invoices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult[0].total,
        pages: Math.ceil(totalResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('❌ Get invoices error:', error);
    res.status(500).json({
      error: 'Failed to get invoices',
      message: error.message
    });
  }
});

// GET /api/invoices/:id - Get invoice by ID with items
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await query(`
      SELECT i.*, c.name as customer_name, c.email as customer_email, c.phone as customer_phone,
             co.name as company_name, co.email as company_email, co.phone as company_phone,
             u.full_name as created_by_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN companies co ON i.company_id = co.id
      LEFT JOIN users u ON i.created_by = u.id
      WHERE i.id = ?
    `, [id]);

    if (invoice.length === 0) {
      return res.status(404).json({
        error: 'Invoice not found',
        message: 'Invoice does not exist'
      });
    }

    // Get invoice items
    const items = await query(`
      SELECT ii.*, p.name as product_name, p.sku as product_sku
      FROM invoice_items ii
      LEFT JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
      ORDER BY ii.id
    `, [id]);

    // Get payments
    const payments = await query(`
      SELECT * FROM payments
      WHERE invoice_id = ?
      ORDER BY payment_date DESC
    `, [id]);

    res.json({
      invoice: invoice[0],
      items,
      payments
    });
  } catch (error) {
    console.error('❌ Get invoice error:', error);
    res.status(500).json({
      error: 'Failed to get invoice',
      message: error.message
    });
  }
});

// POST /api/invoices - Create new invoice with items
router.post('/', [
  authenticateToken,
  body('customer_id').notEmpty().withMessage('Customer ID is required'),
  body('company_id').notEmpty().withMessage('Company ID is required'),
  body('invoice_date').isDate().withMessage('Valid invoice date is required'),
  body('due_date').optional().isDate().withMessage('Valid due date is required'),
  body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
  body('items.*.description').notEmpty().withMessage('Item description is required'),
  body('items.*.quantity').isFloat({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('items.*.unit_price').isFloat({ gt: 0 }).withMessage('Unit price must be greater than 0')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      customer_id,
      company_id,
      invoice_date,
      due_date,
      items,
      notes,
      tax_rate = 14.0
    } = req.body;

    // Calculate totals
    let subtotal = 0;
    const processedItems = items.map(item => {
      const lineTotal = item.quantity * item.unit_price;
      const discountAmount = lineTotal * (item.discount_percent || 0) / 100;
      const finalTotal = lineTotal - discountAmount;
      subtotal += finalTotal;
      
      return {
        ...item,
        line_total: finalTotal
      };
    });

    const taxAmount = subtotal * (tax_rate / 100);
    const totalAmount = subtotal + taxAmount;

    // Generate invoice number
    const invoice_number = await generateInvoiceNumber();

    // Create invoice and items in a transaction
    const result = await transaction(async (connection) => {
      // Insert invoice
      const [invoiceResult] = await connection.execute(`
        INSERT INTO invoices (
          invoice_number, customer_id, company_id, invoice_date, due_date,
          subtotal, tax_rate, tax_amount, total_amount, status, notes, created_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        invoice_number, customer_id, company_id, invoice_date, due_date,
        subtotal, tax_rate, taxAmount, totalAmount, 'draft', notes, req.user.id
      ]);

      const invoiceId = invoiceResult.insertId;

      // Insert invoice items
      for (const item of processedItems) {
        await connection.execute(`
          INSERT INTO invoice_items (
            invoice_id, product_id, description, quantity, unit_price,
            discount_percent, line_total
          ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [
          invoiceId, item.product_id || null, item.description || null,
          item.quantity, item.unit_price, item.discount_percent || 0, item.line_total
        ]);
      }

      return invoiceId;
    });

    // Get created invoice with items
    const newInvoice = await query(`
      SELECT i.*, c.name as customer_name, co.name as company_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN companies co ON i.company_id = co.id
      WHERE i.id = ?
    `, [result]);

    const newItems = await query(`
      SELECT ii.*, p.name as product_name, p.sku as product_sku
      FROM invoice_items ii
      LEFT JOIN products p ON ii.product_id = p.id
      WHERE ii.invoice_id = ?
    `, [result]);

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: newInvoice[0],
      items: newItems
    });
  } catch (error) {
    console.error('❌ Create invoice error:', error);
    res.status(500).json({
      error: 'Failed to create invoice',
      message: error.message
    });
  }
});

// PUT /api/invoices/:id - Update invoice
router.put('/:id', [
  authenticateToken,
  body('customer_id').optional().notEmpty().withMessage('Customer ID cannot be empty'),
  body('company_id').optional().notEmpty().withMessage('Company ID cannot be empty'),
  body('invoice_date').optional().isDate().withMessage('Valid invoice date is required'),
  body('due_date').optional().isDate().withMessage('Valid due date is required'),
  body('status').optional().isIn(['draft', 'sent', 'paid', 'overdue', 'cancelled']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      customer_id,
      company_id,
      invoice_date,
      due_date,
      notes,
      status
    } = req.body;

    // Check if invoice exists
    const existingInvoice = await query('SELECT id, status FROM invoices WHERE id = ?', [id]);

    if (existingInvoice.length === 0) {
      return res.status(404).json({
        error: 'Invoice not found',
        message: 'Invoice does not exist'
      });
    }

    // Check if invoice can be updated (not paid or cancelled)
    const currentStatus = existingInvoice[0].status;
    if (currentStatus === 'paid' || currentStatus === 'cancelled') {
      return res.status(400).json({
        error: 'Cannot update invoice',
        message: `Invoice is ${currentStatus} and cannot be updated`
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (customer_id) {
      updateFields.push('customer_id = ?');
      updateValues.push(customer_id);
    }
    if (company_id) {
      updateFields.push('company_id = ?');
      updateValues.push(company_id);
    }
    if (invoice_date) {
      updateFields.push('invoice_date = ?');
      updateValues.push(invoice_date);
    }
    if (due_date !== undefined) {
      updateFields.push('due_date = ?');
      updateValues.push(due_date);
    }
    if (notes !== undefined) {
      updateFields.push('notes = ?');
      updateValues.push(notes);
    }
    if (status) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        error: 'No fields to update',
        message: 'Please provide at least one field to update'
      });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(id);

    await query(
      `UPDATE invoices SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated invoice
    const updatedInvoice = await query(`
      SELECT i.*, c.name as customer_name, co.name as company_name
      FROM invoices i
      LEFT JOIN customers c ON i.customer_id = c.id
      LEFT JOIN companies co ON i.company_id = co.id
      WHERE i.id = ?
    `, [id]);

    res.json({
      message: 'Invoice updated successfully',
      invoice: updatedInvoice[0]
    });
  } catch (error) {
    console.error('❌ Update invoice error:', error);
    res.status(500).json({
      error: 'Failed to update invoice',
      message: error.message
    });
  }
});

// DELETE /api/invoices/:id - Delete invoice
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists
    const existingInvoice = await query('SELECT id, status FROM invoices WHERE id = ?', [id]);

    if (existingInvoice.length === 0) {
      return res.status(404).json({
        error: 'Invoice not found',
        message: 'Invoice does not exist'
      });
    }

    // Check if invoice can be deleted (not paid or has payments)
    const currentStatus = existingInvoice[0].status;
    if (currentStatus === 'paid') {
      return res.status(400).json({
        error: 'Cannot delete invoice',
        message: 'Paid invoice cannot be deleted'
      });
    }

    // Check if invoice has payments
    const paymentCount = await query('SELECT COUNT(*) as count FROM payments WHERE invoice_id = ?', [id]);

    if (paymentCount[0].count > 0) {
      return res.status(400).json({
        error: 'Cannot delete invoice',
        message: 'Invoice has related payments'
      });
    }

    // Delete invoice and items in a transaction
    await transaction(async (connection) => {
      // Delete invoice items first
      await connection.execute('DELETE FROM invoice_items WHERE invoice_id = ?', [id]);
      // Delete invoice
      await connection.execute('DELETE FROM invoices WHERE id = ?', [id]);
    });

    res.json({
      message: 'Invoice deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete invoice error:', error);
    res.status(500).json({
      error: 'Failed to delete invoice',
      message: error.message
    });
  }
});

// POST /api/invoices/:id/payments - Add payment to invoice
router.post('/:id/payments', [
  authenticateToken,
  body('payment_date').isDate().withMessage('Valid payment date is required'),
  body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
  body('payment_method').isIn(['cash', 'bank_transfer', 'credit_card', 'check', 'other']).withMessage('Invalid payment method')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const { payment_date, amount, payment_method, notes } = req.body;

    // Check if invoice exists
    const invoice = await query('SELECT id, total_amount, status FROM invoices WHERE id = ?', [id]);

    if (invoice.length === 0) {
      return res.status(404).json({
        error: 'Invoice not found',
        message: 'Invoice does not exist'
      });
    }

    const invoiceData = invoice[0];

    // Check if invoice is in valid status for payment
    if (invoiceData.status === 'cancelled') {
      return res.status(400).json({
        error: 'Cannot add payment',
        message: 'Cancelled invoice cannot receive payments'
      });
    }

    // Generate payment number
    const year = new Date().getFullYear();
    const prefix = `PAY-${year}`;
    
    const lastPayment = await query(
      'SELECT payment_number FROM payments WHERE payment_number LIKE ? ORDER BY id DESC LIMIT 1',
      [`${prefix}%`]
    );
    
    let sequence = 1;
    if (lastPayment.length > 0) {
      const lastNumber = parseInt(lastPayment[0].payment_number.split('-')[2]);
      sequence = lastNumber + 1;
    }
    
    const payment_number = `${prefix}-${sequence.toString().padStart(4, '0')}`;

    // Create payment
    const result = await query(`
      INSERT INTO payments (
        payment_number, invoice_id, payment_date, amount,
        payment_method, status, notes, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      payment_number, id, payment_date, amount,
      payment_method, 'completed', notes || null, req.user.id
    ]);

    // Check if invoice is fully paid
    const totalPaid = await query(`
      SELECT SUM(amount) as total FROM payments 
      WHERE invoice_id = ? AND status = 'completed'
    `, [id]);

    const paidAmount = totalPaid[0].total || 0;
    let newStatus = invoiceData.status;

    if (paidAmount >= invoiceData.total_amount) {
      newStatus = 'paid';
    } else if (newStatus === 'draft') {
      newStatus = 'sent';
    }

    // Update invoice status if needed
    if (newStatus !== invoiceData.status) {
      await query('UPDATE invoices SET status = ? WHERE id = ?', [newStatus, id]);
    }

    // Get created payment
    const newPayment = await query('SELECT * FROM payments WHERE id = ?', [result.insertId]);

    res.status(201).json({
      message: 'Payment added successfully',
      payment: newPayment[0],
      invoiceStatus: newStatus,
      totalPaid: paidAmount
    });
  } catch (error) {
    console.error('❌ Add payment error:', error);
    res.status(500).json({
      error: 'Failed to add payment',
      message: error.message
    });
  }
});

// GET /api/invoices/stats/summary - Get invoice statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { company_id, date_from, date_to } = req.query;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (company_id) {
      whereClause += ' AND company_id = ?';
      params.push(company_id);
    }

    if (date_from) {
      whereClause += ' AND invoice_date >= ?';
      params.push(date_from);
    }

    if (date_to) {
      whereClause += ' AND invoice_date <= ?';
      params.push(date_to);
    }

    const [
      totalInvoices,
      draftInvoices,
      sentInvoices,
      paidInvoices,
      overdueInvoices,
      totalRevenue,
      unpaidRevenue
    ] = await Promise.all([
      query(`SELECT COUNT(*) as count FROM invoices ${whereClause}`, params),
      query(`SELECT COUNT(*) as count FROM invoices WHERE status = 'draft' ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : []),
      query(`SELECT COUNT(*) as count FROM invoices WHERE status = 'sent' ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : []),
      query(`SELECT COUNT(*) as count FROM invoices WHERE status = 'paid' ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : []),
      query(`SELECT COUNT(*) as count FROM invoices WHERE status = 'overdue' ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : []),
      query(`SELECT SUM(total_amount) as total FROM invoices WHERE status = 'paid' ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : []),
      query(`SELECT SUM(total_amount) as total FROM invoices WHERE status IN ('sent', 'overdue') ${company_id ? 'AND company_id = ?' : ''}`, company_id ? [company_id] : [])
    ]);

    res.json({
      statistics: {
        total: totalInvoices[0].count,
        draft: draftInvoices[0].count,
        sent: sentInvoices[0].count,
        paid: paidInvoices[0].count,
        overdue: overdueInvoices[0].count,
        totalRevenue: totalRevenue[0].total || 0,
        unpaidRevenue: unpaidRevenue[0].total || 0
      }
    });
  } catch (error) {
    console.error('❌ Get invoice stats error:', error);
    res.status(500).json({
      error: 'Failed to get invoice statistics',
      message: error.message
    });
  }
});

module.exports = router;