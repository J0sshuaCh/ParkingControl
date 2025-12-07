import axios from "axios";

const API_URL = "http://localhost:8800/api/tickets";

export interface Ticket {
    id_ticket: number;
    id_espacio: number;
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

export interface TicketHistorial {
    id_ticket: number;
    codigo_ticket: string;
    hora_entrada: string;
    hora_salida: string | null;
    tiempo_permanencia: number | null;
    monto_total: number | null;
    estado: string;
    motivo_anulacion: string | null;
    placa: string;
    tipo_vehiculo: string;
    codigo_espacio: string;
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

// Nuevas funciones para edición y anulación
export const updateTicket = async (id: number, data: { nueva_placa: string, nuevo_tipo: string }) => {
    try {
        const res = await axios.put(`${API_URL}/${id}`, data);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al actualizar ticket" };
    }
};

export const anularTicket = async (id: number, motivo: string) => {
    try {
        const res = await axios.post(`${API_URL}/${id}/anular`, { motivo });
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al anular ticket" };
    }
};

export const getTicketHistory = async (start: string, end: string): Promise<TicketHistorial[]> => {
    try {
        const res = await axios.get<TicketHistorial[]>(`${API_URL}/historial?start=${start}&end=${end}`);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al obtener historial" };
    }
};