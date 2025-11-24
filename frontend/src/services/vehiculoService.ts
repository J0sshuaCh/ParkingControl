import axios from "axios";

// Asegúrate de que este puerto coincida con tu backend (.env o index.js)
const API_URL = "http://localhost:8800/api/vehiculos";

/* --- INTERFACES DE TIPADO (Para mejor ayuda en el editor) --- */

export interface EspacioLibre {
    id_espacio: number;
    codigo: string;
}

export interface VehiculoActivo {
    id_vehiculo: number;
    placa: string;
    tipo_vehiculo: string;
    hora_ingreso: string;
    espacio: string;
    status: string;
    codigo_ticket: string;
}

export interface RegistroEntradaParams {
    placa: string;
    tipo_vehiculo: string;
    modo_asignacion: "auto" | "manual";
    id_espacio_manual?: string | number; // Se envía si el modo es manual
}

/* --- FUNCIONES DEL SERVICIO --- */

// 1. Obtener espacios libres para el desplegable
export const getEspaciosLibres = async (): Promise<EspacioLibre[]> => {
    try {
        const res = await axios.get<EspacioLibre[]>(`${API_URL}/espacios-libres`);
        return res.data;
    } catch (err: any) {
        // Devuelve el mensaje exacto del backend si existe
        throw err.response?.data || { message: "Error al cargar espacios libres" };
    }
};

// 2. Obtener la lista de vehículos que están dentro del parqueo
export const getVehiculosActivos = async (): Promise<VehiculoActivo[]> => {
    try {
        // Asumiendo que la ruta raíz '/' devuelve los activos (ajustar según tu routes.js)
        const res = await axios.get<VehiculoActivo[]>(`${API_URL}/`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al cargar vehículos activos" };
    }
};

// 3. Registrar la entrada de un nuevo vehículo
export const registrarEntrada = async (datos: RegistroEntradaParams) => {
    try {
        const res = await axios.post(`${API_URL}/entrada`, datos, {
            headers: { "Content-Type": "application/json" },
        });
        return res.data; // Retorna { message, ticket, espacio }
    } catch (err: any) {
        throw err.response?.data || { message: "Error al registrar entrada" };
    }
};