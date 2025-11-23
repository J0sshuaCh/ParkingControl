import { db } from "../database/connection.js";

export const TicketModel = {
    obtenerTodos: async () => {
        const sql = `
            SELECT 
                t.id_ticket,
                t.codigo_ticket,
                t.hora_entrada,
                t.hora_salida,
                t.tiempo_permanencia,
                t.monto_total,
                t.estado,
                v.placa,
                v.tipo_vehiculo,
                e.codigo AS codigo_espacio,
                tr.precio_hora
            FROM ticket t
            JOIN vehiculos v   ON t.id_vehiculo = v.id_vehiculo
            JOIN espacio e    ON t.id_espacio   = e.id_espacio
            JOIN tarifa tr    ON t.id_tarifa    = tr.id_tarifa
            ORDER BY t.id_ticket DESC;
        `;
        try {
            const [rows] = await db.query(sql);
            return rows;
        } catch (err) {
            console.error('Error en TicketModel.obtenerTodos:', err);
            throw err;
        }
    },
    // Buscar ticket activo por placa (estado 'Emitido')
    buscarPorPlaca: async (placa) => {
        const sql = `
            SELECT 
                t.id_ticket,
                t.hora_entrada,
                t.id_espacio,
                t.id_vehiculo,
                t.id_tarifa,
                v.placa,
                v.tipo_vehiculo,
                e.codigo as codigo_espacio,
                tr.precio_hora
            FROM ticket t
            JOIN vehiculos v ON t.id_vehiculo = v.id_vehiculo
            JOIN espacio e ON t.id_espacio = e.id_espacio
            JOIN tarifa tr ON t.id_tarifa = tr.id_tarifa
            WHERE v.placa = ? AND t.estado = 'Emitido'
            LIMIT 1
        `;
        try {
            const [rows] = await db.query(sql, [placa]);
            return rows[0];
        } catch (error) {
            console.error("Error en buscarPorPlaca:", error);
            throw error;
        }
    },

    // Calcular monto basado en horas (fracción cuenta como hora completa)
    calcularMonto: (fechaEntrada, fechaSalida, precioHora) => {
        const entrada = new Date(fechaEntrada);
        const salida = new Date(fechaSalida);

        // Diferencia en milisegundos
        const diffMs = salida.getTime() - entrada.getTime();

        // Diferencia en minutos
        const diffMins = Math.ceil(diffMs / (1000 * 60));

        // Diferencia en horas (para cobro)
        const horasCobrar = Math.ceil(diffMins / 60);

        // Evitar cobros negativos o cero si es muy rápido (mínimo 1 hora)
        const horasFinales = horasCobrar > 0 ? horasCobrar : 1;

        const total = horasFinales * Number(precioHora);

        return {
            tiempo_permanencia: diffMins, // en minutos
            monto_total: total
        };
    },

    // Procesar el pago y cerrar el ticket
    pagarTicket: async (id_ticket, id_espacio, monto_total) => {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            const fechaSalida = new Date();

            // 1. Actualizar el ticket (tiempo_permanencia se deja sin actualizar o se pone NULL)
            const updateTicketSql = `
                UPDATE ticket 
                SET 
                    estado = 'Cobrado',
                    hora_salida = ?,
                    monto_total = ?
                WHERE id_ticket = ?
            `;
            await connection.query(updateTicketSql, [fechaSalida, monto_total, id_ticket]);

            // 2. Liberar el espacio
            const updateEspacioSql = "UPDATE espacio SET estado = 'libre' WHERE id_espacio = ?";
            await connection.query(updateEspacioSql, [id_espacio]);

            // 3. Desvincular vehículo del espacio (opcional, según lógica de negocio)
            const updateVehiculoSql = "UPDATE vehiculos SET id_espacio = NULL WHERE id_espacio = ?";
            await connection.query(updateVehiculoSql, [id_espacio]);

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            console.error("Error en pagarTicket:", error);
            throw error;
        } finally {
            connection.release();
        }
    }

};
