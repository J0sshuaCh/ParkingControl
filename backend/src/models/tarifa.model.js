import { db } from '../database/connection.js';

export const TarifaModel = {
    // Obtener todas las tarifas
    getAll: async () => {
        try {
            const [rows] = await db.query("SELECT * FROM tarifa");
            return rows;
        } catch (error) {
            console.error("Error en TarifaModel.getAll:", error);
            throw error;
        }
    },

    // Crear tarifa
    create: async ({ tipo_vehiculo, precio_hora, fecha_vigencia_inicio, fecha_vigencia_fin, estado }) => {
        try {
            // NOTA: Lo ideal es que id_tarifa sea AUTO_INCREMENT en la DB.
            // Si no lo es, usamos una subconsulta para obtener el siguiente ID seguro (Max + 1)
            // o generamos uno si la tabla está vacía.
            const [maxIdRow] = await db.query("SELECT MAX(id_tarifa) as maxId FROM tarifa");
            const newId = (maxIdRow[0].maxId || 0) + 1;

            const sql = `
                INSERT INTO tarifa 
                (id_tarifa, tipo_vehiculo, precio_hora, fecha_vigencia_inicio, fecha_vigencia_fin, estado) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;

            const valores = [
                newId,
                tipo_vehiculo,
                precio_hora,
                fecha_vigencia_inicio,
                fecha_vigencia_fin || null,
                estado || 'En vigencia'
            ];

            await db.query(sql, valores);

            return {
                id_tarifa: newId,
                tipo_vehiculo,
                precio_hora,
                estado
            };
        } catch (error) {
            console.error("Error en TarifaModel.create:", error);
            throw error;
        }
    },

    // Actualizar tarifa
    update: async (id, { precio_hora, estado, fecha_vigencia_fin }) => {
        try {
            // Construimos la query dinámicamente o actualizamos campos fijos según tu lógica
            const sql = "UPDATE tarifa SET precio_hora = ?, estado = ?, fecha_vigencia_fin = ? WHERE id_tarifa = ?";
            const [result] = await db.query(sql, [precio_hora, estado, fecha_vigencia_fin, id]);

            return result.affectedRows > 0; // Retorna true si actualizó algo
        } catch (error) {
            console.error("Error en TarifaModel.update:", error);
            throw error;
        }
    },

    // Eliminar tarifa
    delete: async (id) => {
        try {
            const [result] = await db.query("DELETE FROM tarifa WHERE id_tarifa = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error en TarifaModel.delete:", error);
            throw error;
        }
    }
};