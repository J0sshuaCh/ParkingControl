import express from "express";
import { registrarVehiculo, listarEspaciosLibres } from "../controllers/vehiculo.controller.js";

const router = express.Router();

// Ruta para obtener los espacios y llenar el <select> (Dropdown)
router.get('/espacios-libres', listarEspaciosLibres);

// Ruta para hacer el registro (POST)
router.post('/', registrarVehiculo);

// Aquí irían las demás (PUT, DELETE, GET todos...)

export default router;