import axios from "axios";

const API_URL = "http://localhost:8800/api/tickets"; // Asegúrate que el puerto sea correcto (ej. 4000 u 8800)

export interface Ticket {
    id_ticket: number;
    id_espacio: number;            // CORRECCIÓN: Ya no es opcional
    codigo_ticket: string;
    hora_entrada: string;
    hora_salida: string | null;
    tiempo_permanencia: number | null;
    monto_total: number | null;
    estado: string;
    placa: string;
    tipo_vehiculo: string;
    codigo_espacio: string;
    precio_hora: string;
}

export const buscarTicketPorPlaca = async (placa: string): Promise<Ticket> => {
    try {
        const res = await axios.get<Ticket>(`${API_URL}/buscar/${placa}`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al buscar ticket" };
    }
};

export const procesarPago = async (
    id_ticket: number,
    id_espacio: number,
    monto_total: number
) => {
    try {
        // Enviamos 'monto_final' porque así lo espera tu backend en procesarPago
        const payload = { id_ticket, id_espacio, monto_final: monto_total };
        const res = await axios.post(`${API_URL}/pagar`, payload, {
            headers: { "Content-Type": "application/json" },
        });
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al procesar pago" };
    }
};

export const obtenerTickets = async (): Promise<Ticket[]> => {
    try {
        const res = await axios.get<Ticket[]>(API_URL);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al obtener tickets" };
    }
};