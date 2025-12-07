import mysql from 'mysql2/promise'; // 1. Usa la versión Promise

const config = {
    host: 'localhost',
    user: 'root', // Usando tu credencial anterior
    password: 'root', // Usando tu credencial anterior
    database: 'parkingcontrol_db',
    waitForConnections: true,
    // 2. Usar un Pool de Conexiones, no una conexión simple.
    connectionLimit: 10
};

// Se crea y exporta el pool de forma NOMBRADA como 'db'
// db ahora es un Pool de Conexiones que soporta async/await
export const db = mysql.createPool(config);

console.log('Conexión a la base de datos MySQL configurada y lista (Pool de Promesas).');