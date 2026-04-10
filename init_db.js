const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initDB() {
    let connection;
    try {
        if (process.env.MYSQL_URL) {
            console.log('Connecting using MYSQL_URL...');
            connection = await mysql.createConnection(process.env.MYSQL_URL);
        } else {
            const config = {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT || 3306,
                multipleStatements: true
            };
            console.log('Connecting using individual variables:', config.host);
            connection = await mysql.createConnection(config);
        }

        const sqlPath = path.join(__dirname, 'db', 'init.sql');
        let sql = fs.readFileSync(sqlPath, 'utf8');
        
        // Remove DATABASE creation/use statements if they interfere with Railway's pre-allocated DB
        // Railway usually provides a specific DB name you must use.
        sql = sql.replace(/CREATE DATABASE IF NOT EXISTS/gi, '-- CREATE DATABASE IF NOT EXISTS');
        sql = sql.replace(/USE school_db;/gi, '-- USE school_db;');

        console.log('Executing init.sql...');
        await connection.query(sql);
        
        console.log('Verifying tables...');
        const [rows] = await connection.query('SHOW TABLES');
        console.log('Current tables in database:', rows);

        if (rows.length > 0) {
            console.log('Database initialized successfully!');
        } else {
            console.log('WARNING: No tables were created. Please check your init.sql content.');
        }

    } catch (err) {
        console.error('Error initializing database:', err);
    } finally {
        if (connection) await connection.end();
    }
}

initDB();
