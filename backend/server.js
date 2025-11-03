// /backend/server.js
require('dotenv').config(); // <-- ¡ESTA LÍNEA ES NUEVA!npm
// /backend/server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db'); // Importa tu conexión

const app = express();
const PORT = process.env.PORT || 3000; // <-- ASÍ SE LEE DEL .ENV

// ... (el resto de tu código de middlewares y rutas) ...

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});