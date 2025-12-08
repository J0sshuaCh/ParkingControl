import { ReporteModel } from "../models/reporte.model.js";

export const generarReporte = async (req, res) => {
    // Recibimos parámetros extra: id_usuario_filtro y formato
    const { fecha_inicio, fecha_fin, id_usuario_filtro, id_usuario_generador, formato } = req.body;

    try {
        if (!fecha_inicio || !fecha_fin) {
            return res.status(400).json({ message: "Se requieren fecha de inicio y fin." });
        }

        // Asumimos que si no viene generador, es el sistema (o podrías sacar esto del token JWT)
        const generador = id_usuario_generador || 1;

        const data = await ReporteModel.generarReporteAvanzado(
            fecha_inicio,
            fecha_fin,
            id_usuario_filtro,
            generador,
            formato
        );

        res.json({
            message: "Reporte generado y guardado exitosamente.",
            data: data
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al generar el reporte" });
    }
};

export const obtenerHistorial = async (req, res) => {
    try {
        const historial = await ReporteModel.listarHistorialReportes();
        res.json(historial);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial" });
    }
};