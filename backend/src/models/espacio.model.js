import { db } from '../database/connection.js'; 

export const EspacioModel = {
    // HU7 - Obtener mapa de ocupación
    getMapaOcupacion: async () => {
        try {
            // Llamada al SP: sp_espacio_mapa_ocupacion
            const [rows] = await db.query('CALL sp_espacio_mapa_ocupacion()');
            // Los SPs devuelven el resultado en la primera posición del array
            return rows[0];
        } catch (error) {
            console.error("Error en EspacioModel.getMapaOcupacion:", error);
            throw error;
        }
    },

    // HU8 - Reservar un espacio
    reservarEspacio: async (codigo_espacio, reason, duration, id_usuario_creador) => {
        try {
            const sql = 'CALL sp_espacio_reservar(?, ?, ?, ?)';
            const [result] = await db.query(sql, [codigo_espacio, reason, duration, id_usuario_creador]);
            
            // result[0] contiene las filas seleccionadas por el SP (el ID generado)
            const respuesta = result[0][0]; 
            return { id_reserva: respuesta.id_reserva, message: respuesta.mensaje };
        } catch (error) {
            console.error("Error en EspacioModel.reservarEspacio:", error);
            throw error;
        }
    },
    
    // Liberar un espacio (Cancelar reserva)
    liberarEspacio: async (id_espacio) => {
        try {
            const [result] = await db.query('CALL sp_espacio_liberar(?)', [id_espacio]);
            const respuesta = result[0][0];
            return { message: respuesta.mensaje };
        } catch (error) {
            console.error("Error en EspacioModel.liberarEspacio:", error);
            throw error;
        }
    }
};