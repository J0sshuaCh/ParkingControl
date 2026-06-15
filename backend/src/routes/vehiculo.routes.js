const { Router } = require('express');
const { VehiculoController } = require('../controllers/vehiculo.controller.js');
const { authMiddleware } = require('../middleware/auth');
const { validateVehicleEntry } = require('../middleware/validation');

const router = Router();

// Todas las rutas requieren autenticación
router.use(authMiddleware);

router.get('/espacios-libres', VehiculoController.listarEspaciosLibres);
router.get('/', VehiculoController.listarVehiculosActivos);
router.get('/verificar/:placa', VehiculoController.verificarPlaca);
router.post('/entrada', validateVehicleEntry, VehiculoController.registrarVehiculo);

module.exports = router;
