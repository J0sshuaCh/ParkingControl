'use client'
import axios from 'axios';

const API_URL = 'http://localhost:8800/api/reportes';
// 1. Definimos las interfaces (la estructura de tus datos)
export interface ReporteResumen {
    id_reporte: number;
    total_ingresos: string; // MySQL devuelve decimales como string a veces, o number
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
// 2. Usamos la interfaz en la promesa de retorno: Promise<ReporteData>
export const generarReporte = async (fechaInicio: string, fechaFin: string): Promise<ReporteData> => {
    try {
        const response = await fetch(`${API_URL}/generar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fecha_inicio: fechaInicio,
                fecha_fin: fechaFin,
                id_usuario_generador: 1
            }),
        });

        if (!response.ok) {
            throw new Error('Error al generar el reporte');
        }

        const data = await response.json();
        return data.data; // Esto debe coincidir con la estructura ReporteData
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const obtenerHistorial = async () => {
    try {
        const response = await fetch(`${API_URL}/historial`);
        if (!response.ok) throw new Error('Error al obtener historial');
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};