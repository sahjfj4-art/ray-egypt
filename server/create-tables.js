const mysql = require('mysql2/promise');
require('dotenv').config();

// Database connection
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4'
};

async function createTables() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database');
    
    // Create tables one by one
    const tables = [
      // Roles table
      `CREATE TABLE IF NOT EXISTS roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        description TEXT,
        permissions JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        role_id INT,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Industries table
      `CREATE TABLE IF NOT EXISTS industries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Companies table
      `CREATE TABLE IF NOT EXISTS companies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        commercial_name VARCHAR(200),
        tax_number VARCHAR(50),
        commercial_register VARCHAR(50),
        address TEXT,
        phone VARCHAR(20),
        email VARCHAR(100),
        website VARCHAR(100),
        logo_url VARCHAR(255),
        industry_id INT,
        company_type ENUM('individual', 'corporation', 'llc', 'partnership') DEFAULT 'corporation',
        status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Customers table
      `CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        email VARCHAR(100),
        phone VARCHAR(20),
        address TEXT,
        tax_number VARCHAR(50),
        customer_type ENUM('individual', 'company') DEFAULT 'individual',
        status ENUM('active', 'inactive') DEFAULT 'active',
        company_id INT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Products table
      `CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        sku VARCHAR(50) UNIQUE,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        cost DECIMAL(10,2),
        stock_quantity INT DEFAULT 0,
        unit VARCHAR(50) DEFAULT 'piece',
        category VARCHAR(100),
        status ENUM('active', 'inactive') DEFAULT 'active',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Invoices table
      `CREATE TABLE IF NOT EXISTS invoices (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_number VARCHAR(50) UNIQUE NOT NULL,
        customer_id INT NOT NULL,
        company_id INT NOT NULL,
        invoice_date DATE NOT NULL,
        due_date DATE,
        subtotal DECIMAL(12,2) NOT NULL,
        tax_rate DECIMAL(5,2) DEFAULT 14.00,
        tax_amount DECIMAL(12,2) NOT NULL,
        total_amount DECIMAL(12,2) NOT NULL,
        status ENUM('draft', 'sent', 'paid', 'overdue', 'cancelled') DEFAULT 'draft',
        notes TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
      
      // Invoice items table
      `CREATE TABLE IF NOT EXISTS invoice_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_id INT NOT NULL,
        product_id INT,
        description VARCHAR(255) NOT NULL,
        quantity DECIMAL(10,2) NOT NULL,
        unit_price DECIMAL(10,2) NOT NULL,
        discount_percent DECIMAL(5,2) DEFAULT 0.00,
        line_total DECIMAL(12,2) NOT NULL
      )`,
      
      // Payments table
      `CREATE TABLE IF NOT EXISTS payments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        payment_number VARCHAR(50) UNIQUE NOT NULL,
        invoice_id INT NOT NULL,
        payment_date DATE NOT NULL,
        amount DECIMAL(12,2) NOT NULL,
        payment_method ENUM('cash', 'bank_transfer', 'credit_card', 'check', 'other') DEFAULT 'cash',
        status ENUM('pending', 'completed', 'failed') DEFAULT 'completed',
        notes TEXT,
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    ];
    
    console.log(`📄 Creating ${tables.length} tables...`);
    
    for (let i = 0; i < tables.length; i++) {
      try {
        console.log(`⏳ Creating table ${i + 1}/${tables.length}`);
        await connection.execute(tables[i]);
        console.log(`✅ Table ${i + 1} created successfully`);
      } catch (error) {
        console.error(`❌ Error creating table ${i + 1}:`, error.message);
      }
    }
    
    // Insert default data
    console.log('📝 Inserting default data...');
    
    try {
      await connection.execute(`
        INSERT INTO roles (name, description, permissions) VALUES
        ('admin', 'System Administrator', '{"all": true}'),
        ('manager', 'Company Manager', '{"companies": ["read", "write", "delete"], "customers": ["read", "write", "delete"], "invoices": ["read", "write", "delete"], "reports": ["read"]}'),
        ('employee', 'Regular Employee', '{"customers": ["read", "write"], "invoices": ["read", "write"]}')
      `);
      console.log('✅ Default roles inserted');
    } catch (error) {
      console.log('ℹ️ Roles might already exist:', error.message);
    }
    
    try {
      await connection.execute(`
        INSERT INTO industries (name, description) VALUES
        ('Technology', 'Technology and IT Services'),
        ('Manufacturing', 'Manufacturing and Production'),
        ('Retail', 'Retail and Wholesale'),
        ('Services', 'Professional Services'),
        ('Construction', 'Construction and Real Estate'),
        ('Healthcare', 'Healthcare and Medical'),
        ('Education', 'Education and Training'),
        ('Other', 'Other Industries')
      `);
      console.log('✅ Default industries inserted');
    } catch (error) {
      console.log('ℹ️ Industries might already exist:', error.message);
    }
    
    console.log('🎉 Database setup completed!');
    
    // Test the tables
    console.log('🔍 Testing tables...');
    const [tablesResult] = await connection.execute('SHOW TABLES');
    console.log('📊 Created tables:', tablesResult.map(t => Object.values(t)[0]));
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

createTables();
