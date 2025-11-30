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

// GET /api/companies - Get all companies
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, industry_id, status } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params = [];

    if (search) {
      whereClause += ' AND (c.name LIKE ? OR c.commercial_name LIKE ? OR c.email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (industry_id) {
      whereClause += ' AND c.industry_id = ?';
      params.push(industry_id);
    }

    if (status) {
      whereClause += ' AND c.status = ?';
      params.push(status);
    }

    const companiesQuery = `
      SELECT c.*, i.name as industry_name, u.full_name as created_by_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      LEFT JOIN users u ON c.created_by = u.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM companies c
      ${whereClause}
    `;

    const [companies, totalResult] = await Promise.all([
      query(companiesQuery, [...params, Number(limit), Number(offset)]),
      query(countQuery, params)
    ]);

    res.json({
      companies,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalResult[0].total,
        pages: Math.ceil(totalResult[0].total / Number(limit))
      }
    });
  } catch (error) {
    console.error('❌ Get companies error:', error);
    res.status(500).json({
      error: 'Failed to get companies',
      message: error.message
    });
  }
});

// GET /api/companies/:id - Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const company = await query(`
      SELECT c.*, i.name as industry_name, u.full_name as created_by_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      LEFT JOIN users u ON c.created_by = u.id
      WHERE c.id = ?
    `, [id]);

    if (company.length === 0) {
      return res.status(404).json({
        error: 'Company not found',
        message: 'Company does not exist'
      });
    }

    // Get company statistics
    const [customerCount, invoiceCount] = await Promise.all([
      query('SELECT COUNT(*) as count FROM customers WHERE company_id = ?', [id]),
      query('SELECT COUNT(*) as count FROM invoices WHERE company_id = ?', [id])
    ]);

    res.json({
      company: company[0],
      statistics: {
        customers: customerCount[0].count,
        invoices: invoiceCount[0].count
      }
    });
  } catch (error) {
    console.error('❌ Get company error:', error);
    res.status(500).json({
      error: 'Failed to get company',
      message: error.message
    });
  }
});

// POST /api/companies - Create new company
router.post('/', [
  authenticateToken,
  body('name').notEmpty().withMessage('Company name is required'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('industry_id').optional().isInt().withMessage('Industry ID must be a number'),
  body('company_type').optional().isIn(['individual', 'corporation', 'llc', 'partnership']).withMessage('Invalid company type'),
  body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      commercial_name,
      tax_number,
      commercial_register,
      address,
      phone,
      email,
      website,
      industry_id,
      company_type = 'corporation',
      status = 'active'
    } = req.body;

    // Check if company already exists
    const existingCompany = await query(
      'SELECT id FROM companies WHERE name = ? OR commercial_name = ?',
      [name, commercial_name]
    );

    if (existingCompany.length > 0) {
      return res.status(400).json({
        error: 'Company already exists',
        message: 'Company name or commercial name already registered'
      });
    }

    // Create company
    const result = await query(`
      INSERT INTO companies (
        name, commercial_name, tax_number, commercial_register, 
        address, phone, email, website, industry_id, 
        company_type, status, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      name, 
      commercial_name || null, 
      tax_number || null, 
      commercial_register || null,
      address || null, 
      phone || null, 
      email || null, 
      website || null, 
      industry_id || null,
      company_type, 
      status, 
      req.user.id
    ]);

    // Get created company
    const newCompany = await query(`
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      WHERE c.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Company created successfully',
      company: newCompany[0]
    });
  } catch (error) {
    console.error('❌ Create company error:', error);
    res.status(500).json({
      error: 'Failed to create company',
      message: error.message
    });
  }
});

// PUT /api/companies/:id - Update company
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Company name cannot be empty'),
  body('email').optional().isEmail().withMessage('Please provide a valid email'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('industry_id').optional().isInt().withMessage('Industry ID must be a number'),
  body('company_type').optional().isIn(['individual', 'corporation', 'llc', 'partnership']).withMessage('Invalid company type'),
  body('status').optional().isIn(['active', 'inactive', 'suspended']).withMessage('Invalid status')
], handleValidationErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      commercial_name,
      tax_number,
      commercial_register,
      address,
      phone,
      email,
      website,
      industry_id,
      company_type,
      status
    } = req.body;

    // Check if company exists
    const existingCompany = await query('SELECT id FROM companies WHERE id = ?', [id]);

    if (existingCompany.length === 0) {
      return res.status(404).json({
        error: 'Company not found',
        message: 'Company does not exist'
      });
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (commercial_name !== undefined) {
      updateFields.push('commercial_name = ?');
      updateValues.push(commercial_name);
    }
    if (tax_number !== undefined) {
      updateFields.push('tax_number = ?');
      updateValues.push(tax_number);
    }
    if (commercial_register !== undefined) {
      updateFields.push('commercial_register = ?');
      updateValues.push(commercial_register);
    }
    if (address !== undefined) {
      updateFields.push('address = ?');
      updateValues.push(address);
    }
    if (phone !== undefined) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (email !== undefined) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (website !== undefined) {
      updateFields.push('website = ?');
      updateValues.push(website);
    }
    if (industry_id !== undefined) {
      updateFields.push('industry_id = ?');
      updateValues.push(industry_id);
    }
    if (company_type !== undefined) {
      updateFields.push('company_type = ?');
      updateValues.push(company_type);
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
      `UPDATE companies SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated company
    const updatedCompany = await query(`
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      WHERE c.id = ?
    `, [id]);

    res.json({
      message: 'Company updated successfully',
      company: updatedCompany[0]
    });
  } catch (error) {
    console.error('❌ Update company error:', error);
    res.status(500).json({
      error: 'Failed to update company',
      message: error.message
    });
  }
});

// DELETE /api/companies/:id - Delete company
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if company exists
    const existingCompany = await query('SELECT id FROM companies WHERE id = ?', [id]);

    if (existingCompany.length === 0) {
      return res.status(404).json({
        error: 'Company not found',
        message: 'Company does not exist'
      });
    }

    // Check if company has related records
    const [customerCount, invoiceCount] = await Promise.all([
      query('SELECT COUNT(*) as count FROM customers WHERE company_id = ?', [id]),
      query('SELECT COUNT(*) as count FROM invoices WHERE company_id = ?', [id])
    ]);

    if (customerCount[0].count > 0 || invoiceCount[0].count > 0) {
      return res.status(400).json({
        error: 'Cannot delete company',
        message: 'Company has related customers or invoices'
      });
    }

    // Delete company
    await query('DELETE FROM companies WHERE id = ?', [id]);

    res.json({
      message: 'Company deleted successfully'
    });
  } catch (error) {
    console.error('❌ Delete company error:', error);
    res.status(500).json({
      error: 'Failed to delete company',
      message: error.message
    });
  }
});

// GET /api/companies/industries - Get all industries
router.get('/industries/all', async (req, res) => {
  try {
    const industries = await query('SELECT * FROM industries ORDER BY name');

    res.json({
      industries
    });
  } catch (error) {
    console.error('❌ Get industries error:', error);
    res.status(500).json({
      error: 'Failed to get industries',
      message: error.message
    });
  }
});

module.exports = router;