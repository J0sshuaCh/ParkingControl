import { Router } from 'express';
import { VehiculoController } from '../controllers/vehiculo.controller.js';

const router = Router();

// Rutas definidas en el servicio de Axios:
router.get('/espacios-libres', VehiculoController.listarEspaciosLibres);
router.get('/', VehiculoController.listarVehiculosActivos); // Para getVehiculosActivos
router.post('/entrada', VehiculoController.registrarVehiculo); // Para registrarEntrada

export default router;