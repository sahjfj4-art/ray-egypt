/**
 * Security and utility helpers
 */

/**
 * Sanitize string input to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/[<>]/g, '') // Remove < and >
    .trim()
    .substring(0, 10000); // Max length
};

/**
 * Sanitize SQL LIKE parameter to prevent SQL injection
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
const sanitizeLikeParam = (str) => {
  if (typeof str !== 'string') return '';
  
  return str
    .replace(/[%_]/g, '') // Remove SQL wildcards
    .trim()
    .substring(0, 255); // Max length
};

/**
 * Validate and sanitize pagination parameters
 * @param {any} page - Page number
 * @param {any} limit - Items per page
 * @returns {{page: number, limit: number, offset: number}} - Sanitized pagination
 */
const sanitizePagination = (page, limit) => {
  const safePage = Math.max(parseInt(page) || 1, 1);
  const safeLimit = Math.min(Math.max(parseInt(limit) || 10, 1), 100); // Max 100 per page
  const safeOffset = (safePage - 1) * safeLimit;
  
  return {
    page: safePage,
    limit: safeLimit,
    offset: safeOffset
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic validation)
 * @param {string} phone - Phone to validate
 * @returns {boolean} - True if valid
 */
const isValidPhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * Escape HTML to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} - Escaped string
 */
const escapeHtml = (str) => {
  if (typeof str !== 'string') return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return str.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Validate integer ID
 * @param {any} id - ID to validate
 * @returns {number|null} - Validated ID or null
 */
const validateId = (id) => {
  const numId = parseInt(id);
  if (isNaN(numId) || numId <= 0) return null;
  return numId;
};

/**
 * Sanitize object recursively
 * @param {any} obj - Object to sanitize
 * @param {number} maxDepth - Maximum depth to recurse
 * @returns {any} - Sanitized object
 */
const sanitizeObject = (obj, maxDepth = 10) => {
  if (maxDepth <= 0) return {};
  
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item, maxDepth - 1));
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        sanitized[key] = sanitizeObject(obj[key], maxDepth - 1);
      }
    }
    return sanitized;
  }
  
  return obj;
};

module.exports = {
  sanitizeString,
  sanitizeLikeParam,
  sanitizePagination,
  isValidEmail,
  isValidPhone,
  escapeHtml,
  validateId,
  sanitizeObject
};

