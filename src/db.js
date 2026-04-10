const mysql = require('mysql2/promise');
require('dotenv').config();

// Step 2: DEBUG log to confirm env loading
console.log("DB_HOST:", process.env.DB_HOST);

// ALWAYS use config object for stability with mysql2/promise
const pool = mysql.createPool({
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

module.exports = pool;
