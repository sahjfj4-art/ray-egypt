const { query } = require('./config/database');

async function addSampleData() {
  try {
    console.log('🔗 Connecting to database...');
    
    // Add sample company
    await query(`
      INSERT INTO companies (name, commercial_register, tax_number, email, phone, address, industry_id, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      'Ray Egypt Technology',
      'CR123456',
      'TX789012',
      'info@rayegypt.com',
      '+201234567890',
      'Cairo, Egypt',
      1,
      'active'
    ]);
    
    // Get the company ID
    const companyResult = await query('SELECT id FROM companies WHERE name = ?', ['Ray Egypt Technology']);
    const companyId = companyResult[0]?.id;
    
    // Add sample customer
    await query(`
      INSERT INTO customers (name, email, phone, address, company_id, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'Customer One',
      'customer1@example.com',
      '+201112223333',
      'Alexandria, Egypt',
      companyId,
      'active'
    ]);
    
    // Add sample product (using actual column names)
    await query(`
      INSERT INTO products (name, description, price, cost, category, status) 
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      'Software License',
      'Annual software license',
      1000.00,
      200.00,
      'Software',
      'active'
    ]);
    
    console.log('✅ Sample data added successfully!');
    console.log(`📊 Company ID: ${companyId}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    process.exit(0);
  }
}

addSampleData();
