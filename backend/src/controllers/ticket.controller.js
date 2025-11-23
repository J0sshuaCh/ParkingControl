import { TicketModel } from "../models/ticket.model.js";

export const buscarTicketPorPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const ticket = await TicketModel.buscarPorPlaca(placa);
        if (!ticket) {
            return res.status(404).json({ message: "No se encontró un ticket activo para esta placa." });
        }

        // Calcular preliminarmente cuánto sería si saliera AHORA
        const ahora = new Date();
        const calculo = TicketModel.calcularMonto(ticket.hora_entrada, ahora, ticket.precio_hora);

        res.json({
            ...ticket,
            salida_estimada: ahora,
            duracion_estimada: calculo.tiempo_permanencia,
            monto_estimado: calculo.monto_total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar ticket" });
    }
};

export const procesarPago = async (req, res) => {
    const { id_ticket, id_espacio, monto_final } = req.body;

    try {
        // Aquí podríamos validar nuevamente montos, pero confiamos en el flujo por ahora
        await TicketModel.pagarTicket(id_ticket, id_espacio, monto_final);
        res.json({ message: "Pago registrado y salida autorizada." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al procesar el pago" });
    }
};
export const obtenerTickets = async (req, res) => {
    try {
        const tickets = await TicketModel.obtenerTodos();
        res.json(tickets);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener tickets', error: err.message });
    }
};