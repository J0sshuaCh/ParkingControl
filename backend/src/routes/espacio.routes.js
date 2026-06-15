const express = require('express');
const { EspacioController } = require('../controllers/espacio.controller.js');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', EspacioController.getMapaOcupacion);
router.post('/reservar', EspacioController.reservarEspacio);
router.put('/liberar/:id', EspacioController.liberarEspacio);

module.exports = router;
