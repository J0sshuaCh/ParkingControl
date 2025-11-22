import { EspacioModel } from '../models/espacio.model.js';

export const EspacioController = {
    // HU7: Visualizar mapa de ocupación en tiempo real (GET)
    getMapaOcupacion: async (req, res) => {
        try {
            const espacios = await EspacioModel.getMapaOcupacion();
            
            // CORRECCIÓN: Devolvemos los datos del Modelo directamente,
            // ya que el Modelo se encarga de dar los nombres de campos (id, status, dbId) correctos
            res.json(espacios);
        } catch (error) {
            console.error('Error en getMapaOcupacion:', error);
            res.status(500).json({ message: 'Error al obtener el mapa de ocupación' });
        }
    },

    // HU8: Reservar un espacio manualmente (POST)
    reservarEspacio: async (req, res) => {
        // id_usuario_creador vendría del token/sesión después del login
        const { spaceId: codigo_espacio, reason: motivo, duration: duracion, id_usuario_creador } = req.body; 

        if (!codigo_espacio || !motivo || !duracion || !id_usuario_creador) {
            return res.status(400).json({ message: 'Faltan datos obligatorios (código, motivo, duración, usuario).' });
        }
        
        try {
            // El modelo ahora maneja la lógica de buscar el ID por código
            const result = await EspacioModel.reservarEspacio(
                codigo_espacio, 
                motivo, 
                duracion, 
                id_usuario_creador
            );
            
            res.status(201).json({ 
                message: `Espacio ${codigo_espacio} reservado con éxito.`,
                id_reserva: result.id_reserva 
            });

        } catch (error) {
            console.error('Error al reservar espacio:', error);
            // El modelo lanza errores si el espacio no existe o no está libre
            res.status(400).json({ message: error.message || 'Error interno del servidor al procesar la reserva.' });
        }
    },
    
    // Lógica para cancelar una reserva (PUT para cambiar estado a 'libre')
    liberarEspacio: async (req, res) => {
        const { id } = req.params; // Esto es el dbId (id_espacio)

        try {
            const affectedRows = await EspacioModel.liberarEspacio(id);
            
            // El modelo ahora se encarga de la lógica de actualización
            res.json({ message: `Espacio ID ${id} liberado y listo para uso.` });
        } catch (error) {
            console.error('Error al liberar espacio:', error);
            res.status(500).json({ message: 'Error al liberar el estado del espacio' });
        }
    }
};