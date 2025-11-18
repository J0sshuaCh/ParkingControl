import 'dotenv/config'; // Carga .env al inicio
import express from 'express';
import cors from 'cors'; 

// 1. Importa el "enchufe" de la BD (ESM)
import pool from './config/db.js'; 

// 2. Importa el "directorio" de rutas (ESM)
import espacioRoutes from './routes/espacioRoutes.js';
import ticketRoutes from './routes/registroRoutes.js'; // Usa tu archivo!
// import authRoutes from './routes/auth.js'; // (Para el futuro)

const app = express();
const PORT = process.env.PORT || 3000;

// 3. Configura los Middlewares
app.use(cors()); 
app.use(express.json()); 

    
// 4. Conecta las Rutas
app.use('/api/espacios', espacioRoutes);
app.use('/api/tickets', ticketRoutes);
// app.use('/api/auth', authRoutes);     // (Para el futuro)

app.get('/', (req, res) => {
  res.send('API de ParkingControl está funcionando');
});

// 5. Arranca el servidor (Probando la BD primero)
async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL (mysql2) establecida exitosamente.');
    connection.release();
    
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();