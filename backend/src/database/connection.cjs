require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || process.env.MYSQLHOST,
    user: process.env.DB_USER || process.env.MYSQLUSER,
    password: process.env.DB_PASS || process.env.MYSQLPASSWORD,
    database: process.env.DB_NAME || process.env.MYSQLDATABASE,
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    waitForConnections: true,
    connectionLimit: 10
};

// Se crea y exporta el pool de forma NOMBRADA como 'db'
// db ahora es un Pool de Conexiones que soporta async/await
const db = mysql.createPool(config);
module.exports = { db };


console.log('Conexión a la base de datos MySQL configurada y lista (Pool de Promesas).');
