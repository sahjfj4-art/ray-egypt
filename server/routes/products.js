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

// GET /api/products - Get all products
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (search) {
      whereClause += ' AND (p.name LIKE ? OR p.sku LIKE ? OR p.description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (category) {
      whereClause += ' AND p.category = ?';
      params.push(category);
    }

    if (status) {
      whereClause += ' AND p.status = ?';
      params.push(status);
    }

    // Validate and sanitize pagination parameters
    const safeLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100); // Max 100 per page
    const safeOffset = Math.max(parseInt(offset) || 0, 0);

    const productsQuery = `
      SELECT p.*, u.full_name as created_by_name
      FROM products p
      LEFT JOIN users u ON p.created_by = u.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      ${whereClause}
    `;

    const [products, totalResult] = await Promise.all([
      query(productsQuery, [...params, safeLimit, safeOffset]),
      query(countQuery, params)
    ]);

    res.json({
      products,
      pagination: {
        page: Number(page),
        limit: safeLimit,
        total: totalResult[0].total,
        pages: Math.ceil(totalResult[0].total / safeLimit)
      }
    });
  } catch (error) {
    console.error('❌ Get products error:', error);
    res.status(500).json({
      error: 'Failed to get products',
      message: error.message
    });
  }
});

// GET /api/products/:id - Get product by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const product = await query(`
      SELECT p.*, u.full_name as created_by_name
      FROM products p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.id = ?
    `, [id]);

    if (product.length === 0) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'Product does not exist'
      });
    }

    // Get product statistics
    const [invoiceCount, totalSold] = await Promise.all([
      query('SELECT COUNT(*) as count FROM invoice_items WHERE product_id = ?', [id]),
      query('SELECT SUM(quantity) as total FROM invoice_items WHERE product_id = ?', [id])
    ]);

    res.json({
      product: product[0],
      statistics: {
        invoices: invoiceCount[0].count,
        totalSold: totalSold[0].total || 0
      }
    });
  } catch (error) {
    console.error('❌ Get product error:', error);
    res.status(500).json({
      error: 'Failed to get product',
      message: error.message
    });
  }
});

// POST /api/products - Create new product
router.post('/', [
  authenticateToken,
  body('name').notEmpty().withMessage('Product name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('stock_quantity').isInt().withMessage('Stock quantity must be an integer'),
  body('category').notEmpty().withMessage('Category is required'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      price,
      cost,
      stock_quantity,
      unit = 'piece',
      category,
      status = 'active'
    } = req.body;

    // Check if product already exists
    const existingProduct = await query(
      'SELECT id FROM products WHERE name = ? OR sku = ?',
      [name, sku]
    );

    if (existingProduct.length > 0) {
      return res.status(400).json({
        error: 'Product already exists',
        message: 'Product name or SKU already registered'
      });
    }

    // Create product
    const result = await query(`
      INSERT INTO products (
        name, sku, description, price, cost, 
        stock_quantity, unit, category, status, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, 
      sku || null, 
      description || null, 
      price, 
      cost || null,
      stock_quantity, 
      unit, 
      category, 
      status, 
      req.user.id
    ]);

    // Get created product
    const newProduct = await query(`
      SELECT p.*, u.full_name as created_by_name
      FROM products p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct[0]
    });
  } catch (error) {
    console.error('❌ Create product error:', error);
    res.status(500).json({
      error: 'Failed to create product',
      message: error.message
    });
  }
});

// PUT /api/products/:id - Update product
router.put('/:id', [
  authenticateToken,
  body('name').optional().notEmpty().withMessage('Product name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('stock_quantity').optional().isInt().withMessage('Stock quantity must be an integer'),
  body('category').optional().notEmpty().withMessage('Category cannot be empty'),
  body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      sku,
      description,
      price,
      cost,
      stock_quantity,
      unit,
      category,
      status
    } = req.body;

    // Check if product exists
    const existingProduct = await query('SELECT id FROM products WHERE id = ?', [id]);

    if (existingProduct.length === 0) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'Product does not exist'
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (sku !== undefined) {
      updateFields.push('sku = ?');
      updateValues.push(sku);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateValues.push(description);
    }
    if (price !== undefined) {
      updateFields.push('price = ?');
      updateValues.push(price);
    }
    if (cost !== undefined) {
      updateFields.push('cost = ?');
      updateValues.push(cost);
    }
    if (stock_quantity !== undefined) {
      updateFields.push('stock_quantity = ?');
      updateValues.push(stock_quantity);
    }
    if (unit !== undefined) {
      updateFields.push('unit = ?');
      updateValues.push(unit);
    }
    if (category !== undefined) {
      updateFields.push('category = ?');
      updateValues.push(category);
    }
    if (status !== undefined) {
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
      `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated product
    const updatedProduct = await query(`
      SELECT p.*, u.full_name as created_by_name
      FROM products p
      LEFT JOIN users u ON p.created_by = u.id
      WHERE p.id = ?
    `, [id]);

    res.json({
      message: 'Product updated successfully',
      product: updatedProduct[0]
    });
  } catch (error) {
    console.error('❌ Update product error:', error);
    res.status(500).json({
      error: 'Failed to update product',
      message: error.message
    });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await query('SELECT id FROM products WHERE id = ?', [id]);

    if (existingProduct.length === 0) {
      return res.status(404).json({
        error: 'Product not found',
        message: 'Product does not exist'
      });
    }

    // Check if product has related invoice items
    const invoiceItemCount = await query('SELECT COUNT(*) as count FROM invoice_items WHERE product_id = ?', [id]);

    if (invoiceItemCount[0].count > 0) {
      return res.status(400).json({
        error: 'Cannot delete product',
        message: 'Product has related invoice items'
      });
    }

    // Delete product
    await query('DELETE FROM products WHERE id = ?', [id]);

    res.json({
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete product error:', error);
    res.status(500).json({
      error: 'Failed to delete product',
      message: error.message
    });
  }
});

// GET /api/products/stats - Get product statistics
router.get('/stats/summary', authenticateToken, async (req, res) => {
  try {
    const [totalProducts, activeProducts, inactiveProducts, lowStock, totalValue] = await Promise.all([
      query('SELECT COUNT(*) as count FROM products'),
      query('SELECT COUNT(*) as count FROM products WHERE status = "active"'),
      query('SELECT COUNT(*) as count FROM products WHERE status = "inactive"'),
      query('SELECT COUNT(*) as count FROM products WHERE stock_quantity < 5 AND status = "active"'),
      query('SELECT SUM(price * stock_quantity) as total FROM products WHERE status = "active"')
    ]);

    res.json({
      statistics: {
        total: totalProducts[0].count,
        active: activeProducts[0].count,
        inactive: inactiveProducts[0].count,
        lowStock: lowStock[0].count,
        totalValue: totalValue[0].total || 0
      }
    });
  } catch (error) {
    console.error('❌ Get product stats error:', error);
    res.status(500).json({
      error: 'Failed to get product statistics',
      message: error.message
    });
  }
});

module.exports = router;
