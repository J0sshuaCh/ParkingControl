import { Router } from 'express';
import { registrarEntrada, listarIngresos } from '../controllers/registroController.js';

const router = Router();

// POST /api/tickets/registrar
router.post('/registrar', registrarEntrada);

// GET /api/tickets/ingresos
router.get('/ingresos', listarIngresos);

export default router;