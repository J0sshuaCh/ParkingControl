require('dotenv').config();
const express = require("express");
const cors = require("cors");

// Seguridad
const { rateLimiter, loginLimiter } = require("./src/middleware/rateLimiter");
const { auditMiddleware } = require("./src/utils/audit");

const usuariosRoutes = require("./src/routes/usuarios.routes.js");
const vehiculoRoutes = require('./src/routes/vehiculo.routes.js');
const espaciosRoutes = require('./src/routes/espacio.routes.js');
const tarifaRoutes = require('./src/routes/tarifa.routes.js');
const ticketRoutes = require('./src/routes/ticket.routes.js');
const dashboardRoutes = require('./src/routes/dashboard.routes.js');
const reporteRoutes = require('./src/routes/reporte.routes.js');

const app = express();

// --- SEGURIDAD: Headers básicos ---
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// --- LIMITACIÓN DE TAMAÑO DE REQUEST BODY (previene ataques de payload grande) ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- RATE LIMITING GLOBAL ---
app.use('/api/', rateLimiter(100, 60000)); // 100 requests por minuto global

// --- CORS CONFIGURADO DE FORMA SEGURA ---
const isProduction = process.env.NODE_ENV === 'production';

const allowedOrigins = [
  "http://localhost",
  "http://localhost:80",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://frontend",
];

// Orígenes explícitos desde variables de entorno (más seguro que wildcards)
const configuredOrigins = [
  process.env.CORS_ORIGIN,
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Solicitudes sin origin (Postman, curl, server-to-server) se permiten
    if (!origin) return callback(null, true);

    // Orígenes explícitos
    if (allowedOrigins.includes(origin) || configuredOrigins.includes(origin)) {
      return callback(null, true);
    }

    // En desarrollo: permitir túneles de desarrollo
    if (!isProduction) {
      if (origin.endsWith('.brs.devtunnels.ms') || origin.endsWith('.loca.lt')) {
        return callback(null, true);
      }
    }

    // En producción: solo orígenes explícitamente configurados
    if (isProduction) {
      // Dominios Vercel y Railway se permiten solo si están configurados explícitamente
      const allowRailway = process.env.ALLOW_RAILWAY_DOMAINS === 'true';
      if (allowRailway && origin.endsWith('.up.railway.app')) {
        return callback(null, true);
      }
      if (origin.endsWith('.vercel.app') && configuredOrigins.some(o => o && o.includes('vercel.app'))) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    }

    // En desarrollo: wildcards controlados
    if (origin.endsWith('.vercel.app') || origin.endsWith('.up.railway.app')) {
      return callback(null, true);
    }

    callback(new Error('Not allowed by CORS'));
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  maxAge: 86400 // Cache preflight por 24h
}));

// --- Ruta de health check (no requiere auth) ---
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

// --- RUTAS API ---

// Auditoría global para todas las rutas API
app.use("/api/", auditMiddleware());

// Login tiene su propio rate limiter más estricto
app.use("/api/usuarios/login", loginLimiter());

app.use("/api/usuarios", usuariosRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/espacios', espaciosRoutes);
app.use('/api/tarifas', tarifaRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reportes', reporteRoutes);

// --- MANEJO GLOBAL DE ERRORES ---
app.use((err, req, res, _next) => {
  console.error('Error no manejado:', err.message);

  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({ message: 'Origen no permitido' });
  }

  res.status(500).json({
    message: 'Error interno del servidor',
    ...(process.env.NODE_ENV !== 'production' && { debug: err.message })
  });
});

// --- INICIAR SERVIDOR ---
const PORT = process.env.PORT || 8800;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend conectado en el puerto ${PORT}`);
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
});
