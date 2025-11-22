import { db } from '../database/connection.js'; 

export const EspacioModel = {
    // HU7 - Obtener mapa de ocupación y estado de reservas/ocupaciones
    getMapaOcupacion: async () => {
        // Consulta SQL para obtener todos los espacios y su estado actual (ocupado por ticket o reservado por reserva activa)
        const sql = `
            SELECT 
                e.id_espacio AS dbId, -- ID numérico para operaciones PUT/DELETE
                e.codigo AS id,         -- Código visible (Ej: 'A-01')
                LOWER(e.estado) AS status, -- << GARANTIZA EL COLOR EN FRONTEND ('libre', 'ocupado', 'reservado')
                COALESCE(v.placa, NULL) AS vehiclePlate, -- Placa, si está ocupado
                COALESCE(r.motivo, NULL) AS reservedFor, -- Motivo de la reserva, si está activo
                COALESCE(r.duracion, NULL) AS reservedUntil -- Duración de la reserva
            FROM 
                espacio e 
            LEFT JOIN 
                ticket t ON e.id_espacio = t.id_espacio AND t.estado = 'Emitido' AND t.hora_salida IS NULL
            LEFT JOIN 
                vehiculos v ON t.id_vehiculo = v.id_vehiculo
            LEFT JOIN 
                reserva r ON e.id_espacio = r.id_espacio AND r.fecha_fin > NOW()
            ORDER BY e.codigo ASC
        `;
        try {
            const [rows] = await db.query(sql); 
            return rows;
        } catch (error) {
            console.error("Error en getMapaOcupacion:", error);
            throw error;
        }
    },

    // HU8 - Reservar un espacio (Crea la reserva y actualiza el estado del espacio)
    reservarEspacio: async (codigo_espacio, reason, duration, id_usuario_creador) => {
        const [espacioRows] = await db.query('SELECT id_espacio FROM espacio WHERE codigo = ?', [codigo_espacio]);
        const id_espacio = espacioRows[0]?.id_espacio;

        if (!id_espacio) {
            throw new Error("Espacio no encontrado.");
        }
        
        const fecha_inicio = new Date();
        const fecha_fin = new Date(fecha_inicio.getTime() + (24 * 60 * 60 * 1000)); // Reserva por 24 horas por defecto

        const sqlInsertReserva = 'INSERT INTO reserva (motivo, duracion, id_espacio, id_usuario_creador, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)';
        const sqlUpdateEspacio = 'UPDATE espacio SET estado = ? WHERE id_espacio = ? AND estado = "libre"';
        
        try {
            // 1. Intenta cambiar el estado a 'reservado' solo si está 'libre'
            const [resultUpdate] = await db.query(sqlUpdateEspacio, ['reservado', id_espacio]); 

            if (resultUpdate.affectedRows === 0) {
                throw new Error("El espacio no estaba disponible (ocupado o ya reservado).");
            }

            // 2. Registra la reserva
            const [resultInsert] = await db.query(sqlInsertReserva, [
                reason, 
                duration, 
                id_espacio, 
                id_usuario_creador, 
                fecha_inicio, 
                fecha_fin
            ]); 

            return { id_reserva: resultInsert.insertId, message: "Espacio reservado exitosamente." };
        } catch (error) {
            console.error("Error en reservarEspacio:", error);
            throw error;
        }
    },
    
    // Lógica extra - Liberar un espacio (usado para cancelar reserva)
    liberarEspacio: async (id_espacio) => {
        const sqlUpdateEspacio = 'UPDATE espacio SET estado = "libre" WHERE id_espacio = ?';
        // Desactivamos la reserva estableciendo la fecha de fin a ahora (para mantener el registro)
        const sqlUpdateReserva = 'UPDATE reserva SET fecha_fin = NOW() WHERE id_espacio = ? AND fecha_fin > NOW()';

        try {
            await db.query(sqlUpdateEspacio, [id_espacio]); 
            await db.query(sqlUpdateReserva, [id_espacio]); 
            return { message: `Espacio ${id_espacio} liberado y reservas desactivadas.` };
        } catch (error) {
            console.error("Error en liberarEspacio:", error);
            throw error;
        }
    }
};