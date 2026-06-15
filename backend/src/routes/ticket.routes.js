const express = require('express');
const { buscarTicketPorPlaca, procesarPago, obtenerTickets, editarTicket, anularTicket, getHistorialSemanal } = require("../controllers/ticket.controller.js");
const { authMiddleware } = require('../middleware/auth');
const { validatePayment } = require('../middleware/validation');

const router = express.Router();

router.use(authMiddleware);

router.get("/historial", getHistorialSemanal);
router.get("/buscar/:placa", buscarTicketPorPlaca);
router.post("/pagar", validatePayment, procesarPago);
router.put("/:id", editarTicket);
router.post("/:id/anular", anularTicket);
router.get("/", obtenerTickets);

module.exports = router;
