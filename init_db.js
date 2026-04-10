const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        multipleStatements: true
    };

    console.log('Connecting to Railway MySQL:', config.host);
    const connection = await mysql.createConnection(config);

    try {
        const sqlPath = path.join(__dirname, 'db', 'init.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');
        
        console.log('Executing init.sql...');
        await connection.query(sql);
        console.log('Database initialized successfully!');
    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        await connection.end();
    }
}

initDB();
