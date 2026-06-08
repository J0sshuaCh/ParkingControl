const { ReporteModel } = require("../models/reporte.model.js");
const { AuditEvent } = require('../utils/audit');

const generarReporte = async (req, res) => {
    const { fecha_inicio, fecha_fin, id_usuario_filtro, formato } = req.body;
    try {
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: "Se requieren fecha de inicio y fin." });
        }
        const generador = req.user.id_usuario;
        const data = await ReporteModel.generarReporteAvanzado(
            fecha_inicio,
            fecha_fin,
            id_usuario_filtro,
            generador,
            formato
        );

        if (req.audit) req.audit.log(AuditEvent.REPORT_GENERATED, {
            desde: fecha_inicio,
            hasta: fecha_fin,
            formato: formato || 'Excel'
        });

        res.json({
            message: "Reporte generado y guardado exitosamente.",
            data: data
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error al generar el reporte" });
    }
};

const obtenerHistorial = async (req, res) => {
    try {
        const historial = await ReporteModel.listarHistorialReportes();
        res.json(historial);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Error al obtener historial" });
    }
};

module.exports = { generarReporte, obtenerHistorial };
