import express from "express";
import usuariosRoutes from "./src/routes/usuarios.routes.js";
import vehiculoRoutes from './src/routes/vehiculo.routes.js';
import espaciosRoutes from './src/routes/espacio.routes.js';
import tarifaRoutes from './src/routes/tarifa.routes.js';
import ticketRoutes from './src/routes/ticket.routes.js';

import cors from "cors"

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.listen(8800, () => {
  console.log("Backend conectado en el puerto 8800");
});

app.use(cors({
  origin: "http://localhost:5173",  // configurar tu ruta de frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/espacios', espaciosRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/tickets', ticketRoutes);

