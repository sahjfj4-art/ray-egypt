const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { query } = require('../config/database');
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

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username, 
      email: user.email,
      role_id: user.role_id 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// POST /api/auth/register - Register new user
router.post('/register', [
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('full_name').notEmpty().withMessage('Full name is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { username, email, password, full_name, phone } = req.body;

    // Check if user already exists
    const existingUser = await query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({
        error: 'User already exists',
        message: 'Username or email already registered'
      });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Get default role (user role)
    const defaultRole = await query('SELECT id FROM roles WHERE name = ?', ['employee']);
    const roleId = defaultRole.length > 0 ? defaultRole[0].id : 3;

    // Create user
    const result = await query(
      `INSERT INTO users (username, email, password_hash, full_name, phone, role_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [username, email, hashedPassword, full_name, phone, roleId]
    );

    // Get created user
    const newUser = await query(
      'SELECT id, username, email, full_name, phone, role_id, is_active FROM users WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: newUser[0],
      token: generateToken(newUser[0])
    });
  } catch (error) {
    console.error('❌ Register error:', error);
    res.status(500).json({
      error: 'Registration failed',
      message: error.message
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required')
], handleValidationErrors, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await query(
      `SELECT u.*, r.name as role_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.username = ? AND u.is_active = 1`,
      [username]
    );

    if (user.length === 0) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user[0].password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      });
    }

    // Remove password from response
    const { password_hash, ...userWithoutPassword } = user[0];

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token: generateToken(user[0])
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      message: error.message
    });
  }
});

// GET /api/auth/profile - Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Please provide a valid token'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user profile
    const user = await query(
      `SELECT u.id, u.username, u.email, u.full_name, u.phone, u.is_active, u.created_at,
              r.id as role_id, r.name as role_name, r.permissions
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.id = ?`,
      [decoded.id]
    );

    if (user.length === 0) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User does not exist'
      });
    }

    res.json({
      user: user[0]
    });
  } catch (error) {
    console.error('❌ Profile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Please provide a valid token'
      });
    }

    res.status(500).json({
      error: 'Failed to get profile',
      message: error.message
    });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', [
  body('full_name').optional().notEmpty().withMessage('Full name cannot be empty'),
  body('phone').optional().isMobilePhone().withMessage('Please provide a valid phone number'),
  body('email').optional().isEmail().withMessage('Please provide a valid email')
], handleValidationErrors, async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        error: 'No token provided',
        message: 'Please provide a valid token'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { full_name, phone, email } = req.body;

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];

    if (full_name) {
      updateFields.push('full_name = ?');
      updateValues.push(full_name);
    }
    if (phone) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await query(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, decoded.id]
      );

      if (existingUser.length > 0) {
        return res.status(400).json({
          error: 'Email already taken',
          message: 'This email is already registered by another user'
        });
      }

      updateFields.push('email = ?');
      updateValues.push(email);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        error: 'No fields to update',
        message: 'Please provide at least one field to update'
      });
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    updateValues.push(decoded.id);

    await query(
      `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`,
      updateValues
    );

    // Get updated user
    const updatedUser = await query(
      `SELECT u.id, u.username, u.email, u.full_name, u.phone, u.is_active, u.created_at,
              r.id as role_id, r.name as role_name, r.permissions
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id 
       WHERE u.id = ?`,
      [decoded.id]
    );

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser[0]
    });
  } catch (error) {
    console.error('❌ Update profile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Please provide a valid token'
      });
    }

    res.status(500).json({
      error: 'Failed to update profile',
      message: error.message
    });
  }
});

module.exports = router;