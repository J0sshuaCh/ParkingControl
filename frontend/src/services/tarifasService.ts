import api from "@/lib/api";

const API_URL = "/api/tarifas";

export interface Tarifa {
    id_tarifa: number;
    tipo_vehiculo: string;
    precio_hora: number;
    fecha_vigencia_inicio: string;
    fecha_vigencia_fin?: string;
    estado: string;
}

export const getTarifaPorTipo = async (tipoVehiculo: string): Promise<Tarifa | null> => {
    try {
        const res = await api.get(API_URL);
        const tarifas: Tarifa[] = res.data;
        return tarifas.find(t => t.tipo_vehiculo === tipoVehiculo && t.estado === 'En vigencia') || null;
    } catch (error) {
        console.error("Error al obtener tarifa:", error);
        return null;
    }
};

export const getTarifas = async (): Promise<Tarifa[]> => {
    try {
        const res = await api.get(API_URL);
        return res.data;
    } catch (error) {
        console.error("Error al obtener tarifas:", error);
        return [];
    }
};

export const createTarifa = async (tarifa: Omit<Tarifa, "id_tarifa">): Promise<Tarifa> => {
    const res = await api.post(API_URL, tarifa);
    return res.data;
};

export const updateTarifa = async (id: number, tarifa: Partial<Tarifa>) => {
    try {
        const res = await api.put(`${API_URL}/${id}`, tarifa);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al actualizar la tarifa" };
    }
};

export const deleteTarifa = async (id: number) => {
    await api.delete(`${API_URL}/${id}`);
};
