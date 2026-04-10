const mysql = require('mysql2/promise');
require('dotenv').config();

const poolConfig = process.env.MYSQL_URL || {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
};

const pool = mysql.createPool({
    ...poolConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
