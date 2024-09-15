// dbTest.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,  // Make sure to add the port here
  };
  

async function testConnection() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to the database successfully!");
    connection.end(); // Close the connection
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

testConnection();
