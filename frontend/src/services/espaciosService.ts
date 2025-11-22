import axios from "axios";

const API_URL = "http://localhost:8800/api/espacios";

// --- TIPOS DE DATOS ---

// Definimos el estado de un espacio
type SpaceStatus = "libre" | "ocupado" | "reservado"

// Definimos la estructura de un espacio (debe coincidir con la respuesta del backend)
export interface Space {
    id: string; // Código del espacio, Ej: "A-01"
    dbId?: number; // <<-- CORRECCIÓN: Ahora incluido para resolver el error de tipado en el componente
    status: SpaceStatus;
    vehiclePlate?: string; 
    reservedFor?: string; 
    reservedUntil?: string; 
}

/**
 * HU7: Obtiene el mapa de ocupación en tiempo real.
 * @returns Promesa que resuelve a la lista de objetos Space.
 */
export const getMapaOcupacion = async (): Promise<Space[]> => {
    try {
        const res = await axios.get(API_URL);
        return res.data; 
    } catch (err: any) {
        throw err.response?.data || { message: "Error al obtener el mapa de ocupación." };
    }
};

/**
 * HU8: Crea una nueva reserva para un espacio.
 */
export const reservarEspacio = async (
    spaceId: string, 
    reason: string, 
    duration: string, 
    id_usuario_creador: number // Asumiendo el tipo de usuario es number
) => {
    try {
        const res = await axios.post(`${API_URL}/reservar`, {
            spaceId,
            reason,
            duration,
            id_usuario_creador
        });
        return res.data;
    } catch (err: any) {
        // El backend devuelve 400 si faltan datos o 404 si el espacio no existe
        throw err.response?.data || { message: "Error de conexión al reservar el espacio." };
    }
};

/**
 * Lógica extra: Libera un espacio que estaba reservado o en mantenimiento.
 * @param id_espacio ID numérico del espacio.
 */
export const liberarEspacio = async (id_espacio: number) => {
    try {
        // Nota: La ruta PUT /liberar/:id espera el ID numérico (id_espacio)
        const res = await axios.put(`${API_URL}/liberar/${id_espacio}`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error de conexión al liberar el espacio." };
    }
};