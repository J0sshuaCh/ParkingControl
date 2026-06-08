const { EspacioModel } = require('../models/espacio.model.js');
const { AuditEvent } = require('../utils/audit');

const EspacioController = {
    getMapaOcupacion: async (req, res) => {
        try {
            const espacios = await EspacioModel.getMapaOcupacion();
            res.json(espacios);
        } catch (error) {
            console.error('Error en getMapaOcupacion:', error.message);
            res.status(500).json({ message: 'Error al obtener el mapa de ocupación' });
        }
    },

    reservarEspacio: async (req, res) => {
        const { spaceId: codigo_espacio, reason: motivo, duration: duracion } = req.body;
        const id_usuario_creador = req.user.id_usuario;

        if (!codigo_espacio || !motivo || !duracion) {
            return res.status(400).json({ message: 'Faltan datos obligatorios (código, motivo, duración).' });
        }

        try {
            const result = await EspacioModel.reservarEspacio(
                codigo_espacio,
                motivo,
                duracion,
                id_usuario_creador
            );

            if (req.audit) req.audit.log(AuditEvent.SPACE_RESERVED, {
                espacio: codigo_espacio,
                motivo,
                duracion_horas: duracion,
                id_reserva: result.id_reserva
            });

            res.status(201).json({
                message: `Espacio ${codigo_espacio} reservado con éxito.`,
                id_reserva: result.id_reserva
            });

        } catch (error) {
            console.error('Error al reservar espacio:', error.message);
            res.status(400).json({ message: error.message || 'Error interno del servidor al procesar la reserva.' });
        }
    },

    liberarEspacio: async (req, res) => {
        const { id } = req.params;

        try {
            await EspacioModel.liberarEspacio(id);

            if (req.audit) req.audit.log(AuditEvent.SPACE_RELEASED, { espacio_id: Number(id) });

            res.json({ message: `Espacio ID ${id} liberado y listo para uso.` });
        } catch (error) {
            console.error('Error al liberar espacio:', error.message);
            res.status(500).json({ message: 'Error al liberar el estado del espacio' });
        }
    }
};

module.exports = { EspacioController };
