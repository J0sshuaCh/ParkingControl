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

const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://frontend",
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
].filter(Boolean);

const allowRailwayDomains = process.env.NODE_ENV !== "production" || process.env.ALLOW_RAILWAY_DOMAINS === "true";

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) ||
        origin.endsWith('.brs.devtunnels.ms') ||
        origin.endsWith('.vercel.app') ||
        (allowRailwayDomains && origin.endsWith('.up.railway.app'))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend conectado en el puerto ${PORT}`);
});

// RUTAS
app.use("/api/usuarios", usuariosRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/espacios', espaciosRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reportes', reporteRoutes);
