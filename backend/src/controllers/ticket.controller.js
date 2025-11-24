import { TicketModel } from "../models/ticket.model.js";

export const buscarTicketPorPlaca = async (req, res) => {
    const { placa } = req.params;
    try {
        const ticket = await TicketModel.buscarPorPlaca(placa);
        if (!ticket) {
            return res.status(404).json({ message: "No se encontró un ticket activo para esta placa." });
        }

        // Calcular cuánto sería si saliera AHORA
        const ahora = new Date();
        const calculo = TicketModel.calcularMonto(ticket.hora_entrada, ahora, ticket.precio_hora);

        // CORRECCIÓN: Mapeamos los cálculos a los nombres que espera el frontend
        res.json({
            ...ticket,
            hora_salida: ahora, // Enviamos la hora de salida simulada
            tiempo_permanencia: calculo.tiempo_permanencia, // Antes: duracion_estimada
            monto_total: calculo.monto_total // Antes: monto_estimado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar ticket" });
    }
};

export const procesarPago = async (req, res) => {
    const { id_ticket, id_espacio, monto_final } = req.body;

    try {
        // Validar datos mínimos
        if (!id_ticket || !monto_final) {
            return res.status(400).json({ message: "Faltan datos para procesar el pago." });
        }

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