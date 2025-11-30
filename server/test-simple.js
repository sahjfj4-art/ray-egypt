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

async function testQuery() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database');
    
    // Test simple query
    console.log('🔍 Testing simple companies query...');
    const companies = await connection.execute('SELECT * FROM companies LIMIT 5');
    console.log('📊 Companies:', companies[0]);
    
    // Test query with joins
    console.log('🔍 Testing query with joins...');
    const companiesWithJoins = await connection.execute(`
      SELECT c.*, i.name as industry_name 
      FROM companies c 
      LEFT JOIN industries i ON c.industry_id = i.id 
      LIMIT 5
    `);
    console.log('📊 Companies with joins:', companiesWithJoins[0]);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

testQuery();
