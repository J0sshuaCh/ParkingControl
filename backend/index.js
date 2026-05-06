const express = require("express");
const usuariosRoutes = require("./src/routes/usuarios.routes.js");
const vehiculoRoutes = require('./src/routes/vehiculo.routes.js');
const espaciosRoutes = require('./src/routes/espacio.routes.js');
const tarifaRoutes = require('./src/routes/tarifa.routes.js');
const ticketRoutes = require('./src/routes/ticket.routes.js');
const dashboardRoutes = require('./src/routes/dashboard.routes.js');
const reporteRoutes = require('./src/routes/reporte.routes.js');

const cors = require("cors");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend conectado en el puerto ${PORT}`);
});

app.use(cors({
  origin: ["http://localhost", "http://localhost:80", "http://localhost:3000", "http://localhost:5173", "http://frontend"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/espacios', espaciosRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reportes', reporteRoutes);
