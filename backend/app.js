import express from 'express';
import cors from 'cors';
import registroRoutes from './routes/registroRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/registro', registroRoutes);

app.listen(3000, () => console.log('Servidor ParkingControl corriendo en http://localhost:3000'));
