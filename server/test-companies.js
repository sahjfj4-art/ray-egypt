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

async function testCompaniesQuery() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database');
    
    // Test 1: Simple query
    console.log('🔍 Test 1: Simple companies query...');
    const simple = await connection.execute('SELECT * FROM companies LIMIT 5');
    console.log('📊 Simple result:', simple[0].length, 'companies');
    
    // Test 2: Query with joins
    console.log('🔍 Test 2: Query with joins...');
    const withJoins = await connection.execute(`
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      LIMIT 5
    `);
    console.log('📊 With joins result:', withJoins[0].length, 'companies');
    
    // Test 3: Query with WHERE clause
    console.log('🔍 Test 3: Query with WHERE clause...');
    const whereClause = 'WHERE 1=1';
    const params = [];
    const queryWithWhere = `
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      ${whereClause}
      ORDER BY c.created_at DESC
      LIMIT ? OFFSET ?
    `;
    
    const result = await connection.execute(queryWithWhere, [5, 0]);
    console.log('📊 With WHERE result:', result[0].length, 'companies');
    
    // Test 4: Query with search
    console.log('🔍 Test 4: Query with search...');
    const searchWhere = 'WHERE c.name LIKE ?';
    const searchParams = ['%Ray%'];
    const searchQuery = `
      SELECT c.*, i.name as industry_name
      FROM companies c
      LEFT JOIN industries i ON c.industry_id = i.id
      ${searchWhere}
      ORDER BY c.created_at DESC
      LIMIT 5
    `;
    
    const searchResult = await connection.execute(searchQuery, searchParams);
    console.log('📊 Search result:', searchResult[0].length, 'companies');
    
    console.log('🎉 All tests passed!');
    
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

testCompaniesQuery();
