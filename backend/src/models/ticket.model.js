import { db } from "../database/connection.js";

export const TicketModel = {
    // Obtener todos los tickets
    obtenerTodos: async () => {
        try {
            const [rows] = await db.query("CALL sp_ticket_listar()");
            return rows[0];
        } catch (err) {
            console.error('Error en TicketModel.obtenerTodos:', err);
            throw err;
        }
    },

    // Buscar ticket activo por placa
    buscarPorPlaca: async (placa) => {
        try {
            const [rows] = await db.query("CALL sp_ticket_buscar_placa(?)", [placa]);
            // Retorna el primer resultado o undefined
            return rows[0][0]; 
        } catch (error) {
            console.error("Error en buscarPorPlaca:", error);
            throw error;
        }
    },

    // Calcular monto (Lógica de negocio que se mantiene en JS por flexibilidad)
    calcularMonto: (fechaEntrada, fechaSalida, precioHora) => {
        const entrada = new Date(fechaEntrada);
        const salida = new Date(fechaSalida);
        const diffMs = salida.getTime() - entrada.getTime();
        const diffMins = Math.ceil(diffMs / (1000 * 60));
        const horasCobrar = Math.ceil(diffMins / 60);
        const horasFinales = horasCobrar > 0 ? horasCobrar : 1;
        const total = horasFinales * Number(precioHora);

        return {
            tiempo_permanencia: diffMins,
            monto_total: total
        };
    },

    // Procesar pago (Ahora usa SP)
    pagarTicket: async (id_ticket, id_espacio, monto_total) => {
        try {
            const sql = "CALL sp_ticket_pagar(?, ?, ?)";
            await db.query(sql, [id_ticket, id_espacio, monto_total]);
            return true;
        } catch (error) {
            console.error("Error en TicketModel.pagarTicket:", error);
            throw error;
        }
    }
};