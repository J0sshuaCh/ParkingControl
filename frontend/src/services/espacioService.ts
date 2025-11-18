import axios from 'axios';

// La URL base de tu API de backend
const API_URL = 'http://localhost:3000/api/espacios';

// Interfaz para los datos que enviamos al reservar
// (Asegúrate que coincida con la que usas en space-management.tsx si la tienes)
interface ReservaData {
  motivo: string;
  duracion: string;
  id_usuario: string; // Deberás obtener esto de tu AuthContext
}

/**
 * HU7: Obtiene el estado de todos los espacios desde el backend
 * LA SOLUCIÓN: Usamos "export const" para que pueda ser importado por nombre.
 */
export const getEspacios = async () => {
  try {
    // Llama a: GET http://localhost:3000/api/espacios
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener espacios:', error);
    throw error;
  }
};

/**
 * HU8: Envía una petición para reservar un espacio
 * LA SOLUCIÓN: Usamos "export const" para que pueda ser importado por nombre.
 */
export const reservarEspacio = async (id_espacio: number, data: ReservaData) => {
  try {
    // Llama a: POST http://localhost:3000/api/espacios/reservar/:id_espacio
    const response = await axios.post(`${API_URL}/reservar/${id_espacio}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al reservar espacio:', error);
    throw error;
  }
};