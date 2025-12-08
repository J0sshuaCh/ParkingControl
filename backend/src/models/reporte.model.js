import { db } from "../database/connection.js";

export const ReporteModel = {
    // Generar reporte avanzado (Resumen + Gráficos + Guardado automático)
    generarReporteAvanzado: async (fechaInicio, fechaFin, idUsuarioFiltro, idUsuarioGenerador, formato) => {
        try {
            const sql = "CALL sp_reporte_avanzado(?, ?, ?, ?, ?)";

            // Nota: idUsuarioFiltro puede ser null si queremos ver todo
            const [results] = await db.query(sql, [
                fechaInicio,
                fechaFin,
                idUsuarioFiltro || null,
                idUsuarioGenerador,
                formato || 'Excel'
            ]);

            // Los procedimientos que devuelven múltiples SELECTs vienen en arrays
            // results[0] -> Resumen General
            // results[1] -> Datos para Gráficos (Desglose Diario)
            return {
                resumen: results[0][0],
                grafica: results[1]
            };

        } catch (error) {
            console.error("Error en ReporteModel.generarReporteAvanzado:", error);
            throw error;
        }
    },

    // (Opcional) Listar reportes históricos para ver el historial
    listarHistorialReportes: async () => {
        try {
            const sql = "SELECT * FROM reporte ORDER BY fecha_generacion DESC";
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            console.error("Error en listarHistorialReportes:", error);
            throw error;
        }
    }
};