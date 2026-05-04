const { db } = require('../database/connection.cjs');

const VehiculoModel = {
    // 1. Obtener espacios libres
    obtenerEspaciosLibres: async () => {
        const sql = "SELECT id_espacio, codigo FROM espacio WHERE estado = 'libre' ORDER BY codigo ASC";
        const [rows] = await db.query(sql);
        return rows;
    },

    // 2. Obtener tarifa
    obtenerTarifa: async (tipoVehiculo) => {
        const sql = "SELECT id_tarifa FROM tarifa WHERE tipo_vehiculo = ? AND estado = 'En vigencia' LIMIT 1";
        const [rows] = await db.query(sql, [tipoVehiculo]);
        return rows[0];
    },

    // 3. Registrar Ingreso
    registrarIngreso: async (placa, tipoVehiculo, idEspacio, idTarifa) => {
        try {
            const codigoTicket = `TK-${Date.now().toString().slice(-6)}`;
            const idUsuario = 1;
            const sql = "CALL sp_vehiculo_registrar_ingreso(?, ?, ?, ?, ?, ?)";
            const params = [placa, tipoVehiculo, idEspacio, idTarifa, codigoTicket, idUsuario];
            const [result] = await db.query(sql, params);
            const data = result[0][0];
            return {
                id_vehiculo: data.id_vehiculo,
                codigo_ticket: data.ticket
            };
        } catch (error) {
            console.error("Error en VehiculoModel.registrarIngreso:", error);
            throw error;
        }
    },

    // 4. Listar vehículos activos
    obtenerVehiculosEnParqueo: async () => {
        try {
            const [rows] = await db.query("CALL sp_vehiculo_listar_activos()")
            return rows[0];
        } catch (error) {
            console.error("Error en obtenerVehiculosEnParqueo:", error);
            throw error;
        }
    },

    // 5. Verificar si una placa tiene un ticket activo
    verificarPlacaActiva: async (placa) => {
        try {
            const sql = "CALL sp_ticket_buscar_placa(?)";
            const [rows] = await db.query(sql, [placa]);
            return rows[0].length > 0;
        } catch (error) {
            console.error("Error en verificarPlacaActiva:", error);
            throw error;
        }
    }
};

module.exports = VehiculoModel;
