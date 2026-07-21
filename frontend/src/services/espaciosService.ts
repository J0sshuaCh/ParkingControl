import api from "@/lib/api";

const API_URL = "/api/espacios";

type SpaceStatus = "libre" | "ocupado" | "reservado"

export interface Space {
    id: string;
    dbId?: number;
    status: SpaceStatus;
    vehiclePlate?: string;
    reservedFor?: string;
    reservedUntil?: string;
}

export const getMapaOcupacion = async (): Promise<Space[]> => {
    try {
        const res = await api.get(API_URL);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al obtener el mapa de ocupación." };
    }
};

export const reservarEspacio = async (
    spaceId: string,
    reason: string,
    duration: number,
    id_usuario_creador: number
) => {
    try {
        const res = await api.post(`${API_URL}/reservar`, {
            spaceId,
            reason,
            duration,
            id_usuario_creador
        });
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error de conexión al reservar el espacio." };
    }
};

export const liberarEspacio = async (id_espacio: number) => {
    try {
        const res = await api.put(`${API_URL}/liberar/${id_espacio}`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error de conexión al liberar el espacio." };
    }
};
