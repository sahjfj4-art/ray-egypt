const jwt = require('jsonwebtoken');
const { query } = require('../config/database');

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'No token provided'
      });
    }

    // Handle mock admin token for development
    if (token.startsWith('mock-admin-token-')) {
      req.user = {
        id: 1,
        username: 'admin',
        email: 'admin@rayegypt.com',
        role: 'admin',
        full_name: 'System Administrator'
      };
      return next();
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await query(
      `SELECT u.id, u.username, u.email, u.full_name, u.is_active,
              r.id as role_id, r.name as role_name, r.permissions
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.id = ? AND u.is_active = 1`,
      [decoded.id]
    );

    if (user.length === 0) {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'User not found or inactive'
      });
    }

    // Add user to request object
    req.user = user[0];
    next();
  } catch (error) {
    console.error('❌ Auth middleware error:', error);

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token',
        message: 'Token is not valid'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired',
        message: 'Token has expired'
      });
    }

    res.status(500).json({
      error: 'Authentication failed',
      message: error.message
    });
  }
};

// Role-based authorization middleware
const authorize = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'User not authenticated'
      });
    }

    const userRole = req.user.role_name;
    const userPermissions = req.user.permissions ? JSON.parse(req.user.permissions) : {};

    // Check if user has required role
    if (roles && !roles.includes(userRole)) {
      return res.status(403).json({
        error: 'Access denied',
        message: 'Insufficient permissions'
      });
    }

    // Check if user has all permissions (for admin)
    if (userPermissions.all) {
      return next();
    }

    // Add permission checking logic here based on the route
    req.user.permissions = userPermissions;
    next();
  };
};

// Permission-based authorization middleware
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Access denied',
        message: 'User not authenticated'
      });
    }

    const userPermissions = req.user.permissions ? JSON.parse(req.user.permissions) : {};

    // Check if user has all permissions
    if (userPermissions.all) {
      return next();
    }

    // Check specific permission
    if (!userPermissions[permission] || !userPermissions[permission].includes('read')) {
      return res.status(403).json({
        error: 'Access denied',
        message: `Permission '${permission}' required`
      });
    }

    next();
  };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await query(
      `SELECT u.id, u.username, u.email, u.full_name, u.is_active,
              r.id as role_id, r.name as role_name, r.permissions
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.id = ? AND u.is_active = 1`,
      [decoded.id]
    );

    if (user.length > 0) {
      req.user = user[0];
    }

    next();
  } catch (error) {
    // Optional auth doesn't fail, just continues without user
    next();
  }
};

module.exports = {
  authenticateToken,
  authorize,
  requirePermission,
  optionalAuth
};