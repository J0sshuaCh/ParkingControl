import express from 'express';
import { registrarEntrada, listarIngresos } from '../controllers/registroController.js';
const router = express.Router();

router.post('/entrada', registrarEntrada);
router.get('/ingresos', listarIngresos);

export default router;