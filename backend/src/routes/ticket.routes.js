import express from "express";
import { buscarTicketPorPlaca, procesarPago, obtenerTickets } from "../controllers/ticket.controller.js";

const router = express.Router();

router.get("/buscar/:placa", buscarTicketPorPlaca);
router.post("/pagar", procesarPago);
router.get("/", obtenerTickets);                 // <--- NUEVA RUTA

export default router;
