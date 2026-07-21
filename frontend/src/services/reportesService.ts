import api from "@/lib/api";

const API_URL = "/api/reportes";

export interface ReporteResumen {
    id_reporte: number;
    total_ingresos: string;
    total_vehiculos: number;
    promedio_minutos_permanencia: string | number;
    ticket_promedio: string | number;
}

export interface ReporteGraficaItem {
    fecha: string;
    cantidad_vehiculos: number;
    ingresos_dia: string | number;
}

export interface ReporteData {
    resumen: ReporteResumen;
    grafica: ReporteGraficaItem[];
}

export const generarReporte = async (fechaInicio: string, fechaFin: string): Promise<ReporteData> => {
    try {
        const response = await api.post(`${API_URL}/generar`, {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const obtenerHistorial = async () => {
    try {
        const response = await api.get(`${API_URL}/historial`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
