import { db } from '../database/connection.js';

export const VehiculoModel = {
    // 1. Obtener espacios libres (Consulta simple, se puede dejar directa o usar SP si creaste uno)
    obtenerEspaciosLibres: async () => {
        // Usamos la query directa o el SP `sp_buscar_espacios_libres` si lo tienes.
        // En tu script anterior usaste una query directa en el SP de espacio, pero aquí lo mantenemos simple.
        const sql = "SELECT id_espacio, codigo FROM espacio WHERE estado = 'libre' ORDER BY codigo ASC";
        const [rows] = await db.query(sql);
        return rows;
    },

    // 2. Obtener tarifa (Consulta simple)
    obtenerTarifa: async (tipoVehiculo) => {
        const sql = "SELECT id_tarifa FROM tarifa WHERE tipo_vehiculo = ? AND estado = 'En vigencia' LIMIT 1";
        const [rows] = await db.query(sql, [tipoVehiculo]);
        return rows[0];
    },

    // 3. Registrar Ingreso (Transacción Compleja -> Delegada al SP)
    registrarIngreso: async (placa, tipoVehiculo, idEspacio, idTarifa) => {
        try {
            // Generamos el código del ticket aquí para control
            const codigoTicket = `TK-${Date.now().toString().slice(-6)}`;
            const idUsuario = 1; // Hardcodeado por ahora (admin)

            const sql = "CALL sp_vehiculo_registrar_ingreso(?, ?, ?, ?, ?, ?)";
            const params = [placa, tipoVehiculo, idEspacio, idTarifa, codigoTicket, idUsuario];

            const [result] = await db.query(sql, params);

            // Recuperamos los datos que devuelve el SP
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
            const [rows] = await db.query("CALL sp_vehiculo_listar_activos()");
            return rows[0];
        } catch (error) {
            console.error("Error en obtenerVehiculosEnParqueo:", error);
            throw error;
        }
    },

    // 5. Verificar si una placa tiene un ticket activo
    verificarPlacaActiva: async (placa) => {
        try {
            // Reutilizamos sp_ticket_buscar_placa que busca tickets 'Emitido' para esa placa
            const sql = "CALL sp_ticket_buscar_placa(?)";
            const [rows] = await db.query(sql, [placa]);
            // rows[0] contiene los resultados del primer SELECT del SP
            // Si hay un resultado, significa que el vehículo está dentro
            return rows[0].length > 0;
        } catch (error) {
            console.error("Error en verificarPlacaActiva:", error);
            throw error;
        }
    }
};