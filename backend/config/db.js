// /backend/config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables de .env

// Lee las variables de entorno
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

// Crea la instancia de Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  dialect: 'mysql'
});

// Función para probar la conexión
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida exitosamente.');
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

// Llama a la función de prueba
testConnection();

module.exports = sequelize;