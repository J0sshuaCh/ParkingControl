const express = require("express");
const { generarReporte, obtenerHistorial } = require("../controllers/reporte.controller.js");

const router = express.Router();

router.post("/generar", generarReporte); // POST: Crea, calcula y guarda
router.get("/historial", obtenerHistorial); // GET: Ve reportes pasados

module.exports = router;