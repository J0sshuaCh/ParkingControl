const express = require("express");
const { generarReporte, obtenerHistorial } = require("../controllers/reporte.controller.js");
const { authMiddleware, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);
router.use(requireRole('administrador', 'supervisor'));

router.post("/generar", generarReporte);
router.get("/historial", obtenerHistorial);

module.exports = router;
