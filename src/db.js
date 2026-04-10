const mysql = require('mysql2/promise');
require('dotenv').config();

// Step 2: Add DEBUG log (to confirm)
console.log("DB_HOST:", process.env.DB_HOST);

let pool;

// Improved logic: Use URL if available, otherwise use individual variables
const connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (connectionString) {
    console.log("Connecting using connection string...");
    pool = mysql.createPool(connectionString);
} else {
    console.log("Connecting using individual variables...");
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD || process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 3306,
        ssl: {
            rejectUnauthorized: false
        },
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
}

module.exports = pool;
