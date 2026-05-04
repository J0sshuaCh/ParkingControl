const express = require('express');

const { buscarTicketPorPlaca, procesarPago, obtenerTickets, editarTicket, anularTicket, getHistorialSemanal } = require("../controllers/ticket.controller.js");

const router = express.Router();

router.get("/historial", getHistorialSemanal);
router.get("/buscar/:placa", buscarTicketPorPlaca);
router.post("/pagar", procesarPago);
router.put("/:id", editarTicket);
router.post("/:id/anular", anularTicket);
router.get("/", obtenerTickets);

module.exports = router;
