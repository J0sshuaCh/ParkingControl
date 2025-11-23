// src/services/ticketService.ts
import axios from "axios";

const API_URL = "http://localhost:8800/api/tickets";

/* -------------------------------------------------
   INTERFAZ del ticket (la misma que usas en
   exit-and-billing.tsx). Puedes exportarla si
   la necesitas en otros módulos.
------------------------------------------------- */
export interface Ticket {
    id_espacio?: number;
    id_ticket: number;
    codigo_ticket: string;
    hora_entrada: string;          // ISO string
    hora_salida: string | null;
    tiempo_permanencia: number | null;
    monto_total: number | null;
    estado: string;
    placa: string;
    tipo_vehiculo: string;
    codigo_espacio: string;
    precio_hora: string;           // viene como string desde MySQL
}

/* -------------------------------------------------
   Buscar ticket activo por placa
------------------------------------------------- */
export const buscarTicketPorPlaca = async (placa: string): Promise<Ticket> => {
    try {
        const res = await axios.get<Ticket>(`${API_URL}/buscar/${placa}`);
        return res.data;
    } catch (err: any) {
        // Propagamos el mensaje del backend o un fallback genérico
        throw err.response?.data || { message: "Error al buscar ticket" };
    }
};

/* -------------------------------------------------
   Procesar el pago
   * En el backend el tercer parámetro se llama
     `monto_total`. Aquí lo llamamos `monto_total`
     para que sea coherente con el modelo.
------------------------------------------------- */
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
        return res.data; // { message: "Pago registrado y salida autorizada." }
    } catch (err: any) {
        throw err.response?.data || { message: "Error al procesar pago" };
    }
};

/* -------------------------------------------------
   (Opcional) Obtener todos los tickets – útil para
   una vista de historial o auditoría.
------------------------------------------------- */
export const obtenerTickets = async (): Promise<Ticket[]> => {
    try {
        const res = await axios.get<Ticket[]>(API_URL);
        return res.data;
    } catch (err: any) {
        throw err.response?.data || { message: "Error al obtener tickets" };
    }
};