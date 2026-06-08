const TarifaModel = require('../models/tarifa.model.js');
const { AuditEvent } = require('../utils/audit');

const getTarifas = async (req, res) => {
    try {
        const tarifas = await TarifaModel.getAll();
        res.json(tarifas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tarifas" });
    }
};

const createTarifa = async (req, res) => {
    try {
        const nuevaTarifa = await TarifaModel.create(req.body);

        if (req.audit) req.audit.log(AuditEvent.TARIFA_CREATED, {
            tipo: nuevaTarifa.tipo_vehiculo,
            precio: nuevaTarifa.precio_hora
        });

        res.status(201).json({ message: "Tarifa creada exitosamente", tarifa: nuevaTarifa });
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarifa" });
    }
};

const updateTarifa = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await TarifaModel.update(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Tarifa no encontrada" });
        }

        if (req.audit) req.audit.log(AuditEvent.TARIFA_UPDATED, { tarifa_id: Number(id), ...req.body });

        res.json({ message: "Tarifa actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarifa" });
    }
};

const deleteTarifa = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await TarifaModel.delete(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Tarifa no encontrada" });
        }

        if (req.audit) req.audit.log(AuditEvent.TARIFA_DELETED, { tarifa_id: Number(id) });

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarifa" });
    }
};

module.exports = { getTarifas, createTarifa, updateTarifa, deleteTarifa };
