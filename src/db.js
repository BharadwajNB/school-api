const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

const connectionString = process.env.MYSQL_URL || process.env.DATABASE_URL;

if (connectionString) {
    // Connect using a connection string
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
