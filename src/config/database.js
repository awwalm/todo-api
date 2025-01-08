// src/config/database.js
const mysql = require('mysql2');
const schema = require('./schema');

async function initializeDatabase() {
  // First create a connection without database selection
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST??'localhost',
    user: process.env.DB_USER??'root',
    password: process.env.DB_PASSWORD??'',
    multipleStatements: true // Enable multiple SQL statements
  }).promise();

  try {
    // Execute schema creation
    await connection.query(schema);
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

function createPool() {
  const pool = mysql.createPool({
    host: process.env.DB_HOST??"localhost",
    user: process.env.DB_USER??'root',
    password: process.env.DB_PASSWORD??'',
    database: process.env.DB_NAME??'todos_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

  return pool;
}

async function initializeDatabaseConnection() {
  try {
    // First initialize the database and schema
    await initializeDatabase();
    
    // Then create and return the connection pool
    const pool = createPool();
    
    // Test the connection
    await pool.query('SELECT 1');
    console.log('Database connection established successfully');
    
    return pool;
  } catch (error) {
    console.error('Failed to initialize database connection:', error);
    throw error;
  }
}

module.exports = {
  initializeDatabaseConnection
};