import axios from "axios";

const API_URL = "http://localhost:8800/api/usuarios";

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
