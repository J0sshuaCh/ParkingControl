import express from "express";
import { registrarVehiculo, listarEspaciosLibres,  } from "../controllers/vehiculo.controller.js";

const router = express.Router();

// Ruta para obtener los espacios y llenar el <select> (Dropdown)
router.get('/espacios-libres', listarEspaciosLibres);

// Ruta para hacer el registro (POST)
router.post('/', registrarVehiculo);

// Ruta para listar vehículos en espacios ocupados
router.get('/ocupados', listarVehiculosEnEspaciosOcupados);

// Aquí irían las demás (PUT, DELETE, GET todos...)

export default router;