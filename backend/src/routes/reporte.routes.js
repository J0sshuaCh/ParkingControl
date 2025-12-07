import express from "express";
import { generarReporte, obtenerHistorial } from "../controllers/reporte.controller.js";

const router = express.Router();

router.post("/generar", generarReporte); // POST: Crea, calcula y guarda
router.get("/historial", obtenerHistorial); // GET: Ve reportes pasados

export default router;