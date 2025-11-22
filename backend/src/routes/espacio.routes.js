// src/routes/espacio.routes.js

import express from 'express';
import { EspacioController } from '../controllers/espacio.controller.js';

const router = express.Router();

// HU7: Obtener el mapa de ocupación en tiempo real
// GET /api/espacios
router.get('/', EspacioController.getMapaOcupacion);

// HU8: Crear una reserva (cambia el estado del espacio a 'reservado')
// POST /api/espacios/reservar
router.post('/reservar', EspacioController.reservarEspacio);

// Opcional: Liberar un espacio reservado o en mantenimiento
// PUT /api/espacios/liberar/:id (Usando id_espacio)
router.put('/liberar/:id', EspacioController.liberarEspacio);

export default router;