import api from "@/lib/api";

const API_URL = "/api/usuarios";

export interface Usuario {
  id_usuario: number;
  username: string;
  nombre_completo: string;
  email: string;
  estado: string;
  nombre_rol: string;
  id_rol?: number;
}

export const loginRequest = async (username: string, password: string) => {
  try {
    const res = await api.post(`${API_URL}/login`, {
      username,
      password,
    });
    return res.data;
  } catch (err: any) {
    throw err.response?.data || { message: "Error de conexión con el servidor" };
  }
};

export interface CreateUserParams {
  username: string;
  password: string;
  nombre_completo: string;
  email: string;
  id_rol: number;
}

export const getUsuarios = async (): Promise<Usuario[]> => {
  try {
    const res = await api.get(`${API_URL}/listar`);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al obtener usuarios" };
  }
};

export const createUsuario = async (user: CreateUserParams) => {
  try {
    const res = await api.post(`${API_URL}/register`, user);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al crear usuario" };
  }
};

export const deleteUsuario = async (id: number) => {
  try {
    await api.delete(`${API_URL}/eliminar/${id}`);
  } catch (error: any) {
    throw error.response?.data || { message: "Error al eliminar usuario" };
  }
};

export const updateUsuario = async (id: number, data: Partial<Usuario> & { id_rol?: number }) => {
  try {
    const res = await api.put(`${API_URL}/editar/${id}`, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || { message: "Error al actualizar usuario" };
  }
};
