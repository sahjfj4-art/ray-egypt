const mysql = require('mysql2/promise');
const fs = require('fs');
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

async function importDatabase() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    
    console.log('✅ Connected to database');
    
    // Read SQL file
    const sqlFile = fs.readFileSync('../database/railway-schema.sql', 'utf8');
    
    // Split SQL file into individual statements
    const statements = sqlFile
      .split(/;\s*\n/)
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('--'));
    
    console.log(`📄 Found ${statements.length} SQL statements`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      
      if (statement.trim()) {
        try {
          console.log(`⏳ Executing statement ${i + 1}/${statements.length}`);
          await connection.execute(statement);
          console.log(`✅ Statement ${i + 1} executed successfully`);
        } catch (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message);
          console.log(`📝 Statement: ${statement.substring(0, 100)}...`);
        }
      }
    }
    
    console.log('🎉 Database import completed!');
    
    // Test the tables
    console.log('🔍 Testing tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📊 Created tables:', tables.map(t => Object.values(t)[0]));
    
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

importDatabase();
