const { TicketModel } = require("../models/ticket.model.js");
const { AuditEvent } = require('../utils/audit');

const buscarTicketPorPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const ticket = await TicketModel.buscarPorPlaca(placa);
        if (!ticket) {
            return res.status(404).json({ message: "No se encontró un ticket activo para esta placa." });
        }
        const ahora = new Date();
        const calculo = TicketModel.calcularMonto(ticket.hora_entrada, ahora, ticket.precio_hora);
        res.json({
            ...ticket,
            hora_salida: ahora,
            tiempo_permanencia: calculo.tiempo_permanencia,
            monto_total: calculo.monto_total
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error al buscar ticket" });
    }
};

const procesarPago = async (req, res) => {
    const { id_ticket, id_espacio, monto_final } = req.body;
    try {
        if (!id_ticket || !monto_final) {
            return res.status(400).json({ message: "Faltan datos para procesar el pago." });
        }
        await TicketModel.pagarTicket(id_ticket, id_espacio, monto_final);

        if (req.audit) req.audit.log(AuditEvent.TICKET_PAID, { ticket_id: id_ticket, monto: monto_final, espacio_id: id_espacio });

        res.json({ message: "Pago registrado y salida autorizada." });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error al procesar el pago" });
    }
};

const obtenerTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.obtenerTodos();
        const { estado } = req.query;
        if (estado) {
            const ticketsFiltrados = tickets.filter(t => t.estado === estado);
            return res.json(ticketsFiltrados);
        }
        res.json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error al obtener tickets' });
    }
};

const editarTicket = async (req, res) => {
    const { id } = req.params;
    const { nueva_placa, nuevo_tipo } = req.body;
    try {
        await TicketModel.editarTicket(id, nueva_placa.toUpperCase(), nuevo_tipo);

        if (req.audit) req.audit.log(AuditEvent.TICKET_EDITED, { ticket_id: Number(id), nueva_placa, nuevo_tipo });

        res.json({ message: "Ticket actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al editar ticket" });
    }
};

const anularTicket = async (req, res) => {
    const { id } = req.params;
    const { motivo } = req.body;
    try {
        await TicketModel.anularTicket(id, motivo, req.user.id_usuario);

        if (req.audit) req.audit.log(AuditEvent.TICKET_ANULLED, { ticket_id: Number(id), motivo });

        res.json({ message: "Ticket anulado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al anular ticket" });
    }
};

const getHistorialSemanal = async (req, res) => {
    const { start, end } = req.query;
    try {
        if (!start || !end) {
            return res.status(400).json({ message: "Fechas start y end son requeridas" });
        }
        const historial = await TicketModel.obtenerHistorialSemanal(start, end);
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial" });
    }
};

module.exports = { buscarTicketPorPlaca, procesarPago, obtenerTickets, editarTicket, anularTicket, getHistorialSemanal };
