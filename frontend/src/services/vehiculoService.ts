import api from "@/lib/api";

const API_URL = "/api/vehiculos";

export interface EspacioLibre {
    id_espacio: number;
    codigo: string;
}

export interface VehiculoActivo {
    id_vehiculo: number;
    id_ticket: number;
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
    id_espacio_manual?: string | number;
}

export const getEspaciosLibres = async (): Promise<EspacioLibre[]> => {
    try {
        const res = await api.get<EspacioLibre[]>(`${API_URL}/espacios-libres`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al cargar espacios libres" };
    }
};

export const getVehiculosActivos = async (): Promise<VehiculoActivo[]> => {
    try {
        const res = await api.get<VehiculoActivo[]>(`${API_URL}/`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al cargar vehículos activos" };
    }
};

export const registrarEntrada = async (datos: RegistroEntradaParams) => {
    try {
        const res = await api.post(`${API_URL}/entrada`, datos);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al registrar entrada" };
    }
};

export const verificarPlaca = async (placa: string): Promise<boolean> => {
    try {
        const res = await api.get(`${API_URL}/verificar/${placa}`);
        return res.data.existe;
    } catch (err: any) {
        console.error("Error verificando placa:", err);
        return false;
    }
};
