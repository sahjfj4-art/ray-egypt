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

async function testFixedQuery() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database');
    
    // Test the fixed query
    console.log('🔍 Testing fixed query...');
    const limit = 10;
    const offset = 0;
    const whereClause = 'WHERE 1=1';
    const params = [];
    
    const companiesQuery = `
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ${Number(limit)} OFFSET ${Number(offset)}
    `;
    
    console.log('📝 Query:', companiesQuery);
    console.log('📋 Params:', params);
    
    const result = await connection.execute(companiesQuery, params);
    console.log('📊 Result:', result[0].length, 'companies');
    console.log('🎉 Fixed query works!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

testFixedQuery();
