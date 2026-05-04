const TarifaModel = require('../models/tarifa.model.js');

const getTarifas = async (req, res) => {
    try {
        const tarifas = await TarifaModel.getAll();
        res.json(tarifas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tarifas", error: error.message });
    }
};

const createTarifa = async (req, res) => {
    try {
        // Delegamos la lógica al modelo
        const nuevaTarifa = await TarifaModel.create(req.body);
        res.status(201).json({ message: "Tarifa creada exitosamente", tarifa: nuevaTarifa });
    } catch (error) {
        res.status(500).json({ message: "Error al crear tarifa", error: error.message });
    }
};

const updateTarifa = async (req, res) => {
    const { id } = req.params;
    try {
        const actualizado = await TarifaModel.update(id, req.body);
        if (!actualizado) {
            return res.status(404).json({ message: "Tarifa no encontrada" });
        }
        res.json({ message: "Tarifa actualizada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar tarifa", error: error.message });
    }
};

const deleteTarifa = async (req, res) => {
    const { id } = req.params;
    try {
        const eliminado = await TarifaModel.delete(id);
        if (!eliminado) {
            return res.status(404).json({ message: "Tarifa no encontrada" });
        }
        res.sendStatus(204); // 204 No Content es estándar para deletes exitosos
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar tarifa", error: error.message });
    }
};

module.exports = { getTarifas, createTarifa, updateTarifa, deleteTarifa };
