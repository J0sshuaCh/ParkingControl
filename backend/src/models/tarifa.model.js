import { db } from '../database/connection.js';

export const TarifaModel = {
    // Obtener todas las tarifas
    getAll: async () => {
        try {
            // 'LISTAR' no requiere los otros parámetros, enviamos NULL
            const [rows] = await db.query("CALL sp_tarifa_crud('LISTAR', NULL, NULL, NULL, NULL)");
            return rows[0];
        } catch (error) {
            console.error("Error en TarifaModel.getAll:", error);
            throw error;
        }
    },

    // Crear tarifa
    create: async ({ tipo_vehiculo, precio_hora, estado }) => {
        try {
            // 'CREAR', id=NULL, tipo, precio, estado
            const sql = "CALL sp_tarifa_crud('CREAR', NULL, ?, ?, ?)";
            const [result] = await db.query(sql, [tipo_vehiculo, precio_hora, estado || 'En vigencia']);
            
            const nuevoId = result[0][0].id_tarifa;
            return { id_tarifa: nuevoId, tipo_vehiculo, precio_hora, estado };
        } catch (error) {
            console.error("Error en TarifaModel.create:", error);
            throw error;
        }
    },

    // Actualizar tarifa
    update: async (id, { precio_hora, estado }) => {
        try {
            // 'EDITAR', id, NULL, precio, estado
            const sql = "CALL sp_tarifa_crud('EDITAR', ?, NULL, ?, ?)";
            const [result] = await db.query(sql, [id, precio_hora, estado]);
            
            // Verificamos si hubo filas afectadas en el resultado del SP
            const afectados = result[0][0].afectados;
            return afectados > 0;
        } catch (error) {
            console.error("Error en TarifaModel.update:", error);
            throw error;
        }
    },

    // Eliminar tarifa
    delete: async (id) => {
        try {
            // 'ELIMINAR', id, NULL, NULL, NULL
            const sql = "CALL sp_tarifa_crud('ELIMINAR', ?, NULL, NULL, NULL)";
            const [result] = await db.query(sql, [id]);
            
            const afectados = result[0][0].afectados;
            return afectados > 0;
        } catch (error) {
            console.error("Error en TarifaModel.delete:", error);
            throw error;
        }
    }
};