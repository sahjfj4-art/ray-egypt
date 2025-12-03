const express = require('express');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
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

// GET /api/customers - Get all customers
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, customer_type, status, company_id } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (search) {
      whereClause += ' AND (c.name LIKE ? OR c.email LIKE ? OR c.phone LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (customer_type) {
      whereClause += ' AND c.customer_type = ?';
      params.push(customer_type);
    }

    if (status) {
      whereClause += ' AND c.status = ?';
      params.push(status);
    }

    if (company_id) {
      whereClause += ' AND c.company_id = ?';
      params.push(company_id);
    }

    // Validate and sanitize pagination parameters
    const safeLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100); // Max 100 per page
    const safeOffset = Math.max(parseInt(offset) || 0, 0);

    const customersQuery = `
      SELECT c.*, co.name as company_name, u.full_name as created_by_name
      FROM customers c
      LEFT JOIN companies co ON c.company_id = co.id
      LEFT JOIN users u ON c.created_by = u.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM customers c
      ${whereClause}
    `;

    const [customers, totalResult] = await Promise.all([
      query(customersQuery, [...params, safeLimit, safeOffset]),
      query(countQuery, params)
    ]);

    res.json({
      customers,
      pagination: {
        page: parseInt(page),
        limit: safeLimit,
        total: totalResult[0].total,
        pages: Math.ceil(totalResult[0].total / safeLimit)
      }
    });
  } catch (error) {
    console.error('❌ Get customers error:', error);
    res.status(500).json({
      error: 'Failed to get customers',
      message: error.message
    });
  }
});

// GET /api/customers/:id - Get customer by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await query(`
      SELECT c.*, co.name as company_name, u.full_name as created_by_name
      FROM customers c
      LEFT JOIN companies co ON c.company_id = co.id
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.id = ?
    `, [id]);

    if (customer.length === 0) {
      return res.status(404).json({
        error: 'Customer not found',
        message: 'Customer does not exist'
      });
    }

    // Get customer statistics
    const [invoiceCount, totalRevenue] = await Promise.all([
      query('SELECT COUNT(*) as count FROM invoices WHERE customer_id = ?', [id]),
      query('SELECT SUM(total_amount) as total FROM invoices WHERE customer_id = ? AND status = "paid"', [id])
    ]);

    res.json({
      customer: customer[0],
      statistics: {
        invoices: invoiceCount[0].count,
        totalRevenue: totalRevenue[0].total || 0
      }
    });
  } catch (error) {
    console.error('❌ Get customer error:', error);
    res.status(500).json({
      error: 'Failed to get customer',
      message: error.message
    });
  }
});

// POST /api/customers - Create new customer
router.post('/', [
  authenticateToken,
  body('name').notEmpty().withMessage('Customer name is required'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('customer_type').optional().isIn(['individual', 'company']).withMessage('Invalid customer type'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      address,
      tax_number,
      customer_type = 'individual',
      status = 'active',
      company_id
    } = req.body;

    // Check if customer already exists
    const existingCustomer = await query(
      'SELECT id FROM customers WHERE name = ? OR email = ?',
      [name, email]
    );

    if (existingCustomer.length > 0) {
      return res.status(400).json({
        error: 'Customer already exists',
        message: 'Customer name or email already registered'
      });
    }

    // Create customer
    const result = await query(`
      INSERT INTO customers (
        name, email, phone, address, tax_number, 
        customer_type, status, company_id, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, 
      email || null, 
      phone || null, 
      address || null, 
      tax_number || null,
      customer_type, 
      status, 
      company_id || null, 
      req.user.id
    ]);

    // Get created customer
    const newCustomer = await query(`
      SELECT c.*, co.name as company_name
      FROM customers c
      LEFT JOIN companies co ON c.company_id = co.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Customer created successfully',
      customer: newCustomer[0]
    });
  } catch (error) {
    console.error('❌ Create customer error:', error);
    res.status(500).json({
      error: 'Failed to create customer',
      message: error.message
    });
  }
});

// PUT /api/customers/:id - Update customer
router.put('/:id', [
  authenticateToken,
  body('name').optional().notEmpty().withMessage('Customer name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('customer_type').optional().isIn(['individual', 'company']).withMessage('Invalid customer type'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      address,
      tax_number,
      customer_type,
      status,
      company_id
    } = req.body;

    // Check if customer exists
    const existingCustomer = await query('SELECT id FROM customers WHERE id = ?', [id]);

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        error: 'Customer not found',
        message: 'Customer does not exist'
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (address !== undefined) {
      updateFields.push('address = ?');
      updateValues.push(address);
    }
    if (tax_number !== undefined) {
      updateFields.push('tax_number = ?');
      updateValues.push(tax_number);
    }
    if (customer_type !== undefined) {
      updateFields.push('customer_type = ?');
      updateValues.push(customer_type);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateValues.push(status);
    }
    if (company_id !== undefined) {
      updateFields.push('company_id = ?');
      updateValues.push(company_id);
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
      `UPDATE customers SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated customer
    const updatedCustomer = await query(`
      SELECT c.*, co.name as company_name
      FROM customers c
      LEFT JOIN companies co ON c.company_id = co.id
      WHERE c.id = ?
    `, [id]);

    res.json({
      message: 'Customer updated successfully',
      customer: updatedCustomer[0]
    });
  } catch (error) {
    console.error('❌ Update customer error:', error);
    res.status(500).json({
      error: 'Failed to update customer',
      message: error.message
    });
  }
});

// DELETE /api/customers/:id - Delete customer
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if customer exists
    const existingCustomer = await query('SELECT id FROM customers WHERE id = ?', [id]);

    if (existingCustomer.length === 0) {
      return res.status(404).json({
        error: 'Customer not found',
        message: 'Customer does not exist'
      });
    }

    // Check if customer has related invoices
    const invoiceCount = await query('SELECT COUNT(*) as count FROM invoices WHERE customer_id = ?', [id]);

    if (invoiceCount[0].count > 0) {
      return res.status(400).json({
        error: 'Cannot delete customer',
        message: 'Customer has related invoices'
      });
    }

    // Delete customer
    await query('DELETE FROM customers WHERE id = ?', [id]);

    res.json({
      message: 'Customer deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete customer error:', error);
    res.status(500).json({
      error: 'Failed to delete customer',
      message: error.message
    });
  }
});

// GET /api/customers/stats - Get customer statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const { company_id } = req.query;

    // Build safe queries for statistics
    const statsWhereClause = company_id ? 'WHERE company_id = ?' : '';
    const statsParams = company_id ? [company_id] : [];

    const [totalCustomers, activeCustomers, inactiveCustomers, individualCustomers, companyCustomers] = await Promise.all([
      query(`SELECT COUNT(*) as count FROM customers ${statsWhereClause}`, statsParams),
      query(`SELECT COUNT(*) as count FROM customers WHERE status = ? ${statsWhereClause}`, ['active', ...statsParams]),
      query(`SELECT COUNT(*) as count FROM customers WHERE status = ? ${statsWhereClause}`, ['inactive', ...statsParams]),
      query(`SELECT COUNT(*) as count FROM customers WHERE customer_type = ? ${statsWhereClause}`, ['individual', ...statsParams]),
      query(`SELECT COUNT(*) as count FROM customers WHERE customer_type = ? ${statsWhereClause}`, ['company', ...statsParams])
    ]);

    res.json({
      statistics: {
        total: totalCustomers[0].count,
        active: activeCustomers[0].count,
        inactive: inactiveCustomers[0].count,
        individual: individualCustomers[0].count,
        company: companyCustomers[0].count
      }
    });
  } catch (error) {
    console.error('❌ Get customer stats error:', error);
    res.status(500).json({
      error: 'Failed to get customer statistics',
      message: error.message
    });
  }
});

module.exports = router;