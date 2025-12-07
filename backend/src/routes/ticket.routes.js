import express from 'express';

import { buscarTicketPorPlaca, procesarPago, obtenerTickets, editarTicket, anularTicket, getHistorialSemanal } from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/historial", getHistorialSemanal);
router.get("/buscar/:placa", buscarTicketPorPlaca);
router.post("/pagar", procesarPago);
router.put("/:id", editarTicket);
router.post("/:id/anular", anularTicket);
router.get("/", obtenerTickets);

export default router;
