require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST, 
    user: process.env.DB_USER ,     
    password: process.env.DB_PASS ,
    database: process.env.DB_NAME,        
    waitForConnections: true,
    connectionLimit: 10
};

// Se crea y exporta el pool de forma NOMBRADA como 'db'
// db ahora es un Pool de Conexiones que soporta async/await
const db = mysql.createPool(config);
module.exports = { db };


console.log('Conexión a la base de datos MySQL configurada y lista (Pool de Promesas).');