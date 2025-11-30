import axios from "axios";

const API_URL = "http://localhost:8800/api/usuarios";

export interface Usuario {
  id_usuario: number;
  username: string;
  nombre_completo: string;
  email: string;
  estado: string;
  nombre_rol: string; // O id_rol dependiendo de cómo lo devuelva tu backend
  id_rol?: number;
}
export interface Usuario {
  id_usuario: number;
  username: string;
  nombre_completo: string;
  email: string;
  estado: string;
  nombre_rol: string; // Viene del JOIN en el backend
  id_rol?: number;    // Útil para ediciones
}
export const loginRequest = async (username: string, password: string) => {
  try {
    const res = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });

    return res.data; // viene { message, user }
  } catch (err: any) {
    throw err.response?.data || { message: "Error de conexión con el servidor" };
  }
};

export interface CreateUserParams {
  username: string;
  password:  string;
  nombre_completo: string;
  email: string;
  id_rol: number;
}

// Listar usuarios
export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const res = await axios.get(`${API_URL}/listar`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al obtener usuarios" };
  }
};

// Crear usuario
export const createUsuario = async (user: CreateUserParams) => {
  try {
    const res = await axios.post(`${API_URL}/register`, user);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al crear usuario" };
  }
};

// Eliminar usuario
export const deleteUsuario = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/eliminar/${id}`);
  } catch (error: any) {
    throw error.response?.data || { message: "Error al eliminar usuario" };
  }
};

// Editar usuario (Opcional, si quieres implementarlo después)
export const updateUsuario = async (id: number, data: Partial<Usuario>) => {
    await axios.put(`${API_URL}/editar/${id}`, data);
};