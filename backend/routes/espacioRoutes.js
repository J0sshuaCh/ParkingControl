import { Router } from 'express';
import { listarEspacios, reservarEspacio } from '../controllers/espacioController.js';

const router = Router();

// HU7: GET /api/espacios
router.get('/', listarEspacios);

// HU8: POST /api/espacios/reservar/:id_espacio
router.post('/reservar/:id_espacio', reservarEspacio);

export default router;