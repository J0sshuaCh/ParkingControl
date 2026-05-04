const { db } = require('../database/connection.cjs'); 

// Obtener todos los tickets
async function obtenerTodos() {
    try {
        const [rows] = await db.query("CALL sp_ticket_listar()");
        return rows[0];
    } catch (err) {
        console.error('Error en TicketModel.obtenerTodos:', err);
        throw err;
    }
}

// Buscar ticket activo por placa
async function buscarPorPlaca(placa) {
    try {
        const [rows] = await db.query("CALL sp_ticket_buscar_placa(?)", [placa]);
        return rows[0][0]; // Retorna el primer resultado o undefined
    } catch (error) {
        console.error("Error en buscarPorPlaca:", error);
        throw error;
    }
}

// Calcular monto de permanencia
const calcularMonto = (fechaEntrada, fechaSalida, precioHora) => {
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
}

// Procesar pago (Ahora usa SP)
async function pagarTicket(id_ticket, id_espacio, monto_total) {
    try {
        const sql = "CALL sp_ticket_pagar(?, ?, ?)";
        await db.query(sql, [id_ticket, id_espacio, monto_total]);
        return true;
    } catch (error) {
        console.error("Error en TicketModel.pagarTicket:", error);
        throw error;
    }
}

// Editar Ticket
async function editarTicket(id_ticket, nueva_placa, nuevo_tipo) {
    try {
        const sql = "CALL sp_ticket_editar(?, ?, ?)";
        await db.query(sql, [id_ticket, nueva_placa, nuevo_tipo]);
        return true;
    } catch (error) {
        console.error("Error en TicketModel.editarTicket:", error);
        throw error;
    }
}

// Anular Ticket
async function anularTicket(id_ticket, motivo, id_usuario) {
    try {
        const sql = "CALL sp_ticket_anular(?, ?, ?)";
        await db.query(sql, [id_ticket, motivo, id_usuario]);
        return true;
    } catch (error) {
        console.error("Error en TicketModel.anularTicket:", error);
        throw error;
    }
}

// Historial Semanal
async function obtenerHistorialSemanal(start, end) {
    try {
        const [rows] = await db.query("CALL sp_ticket_historial_semanal(?, ?)", [start, end]);
        return rows[0];
    } catch (error) {
        console.error("Error en TicketModel.obtenerHistorialSemanal:", error);
        throw error;
    }
}

module.exports = {
    TicketModel: {
        obtenerTodos,
        buscarPorPlaca,
        calcularMonto,
        pagarTicket,
        editarTicket,
        anularTicket,
        obtenerHistorialSemanal,
    },
};
