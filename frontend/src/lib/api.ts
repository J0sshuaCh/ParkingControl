import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8800";

/**
 * Instancia de axios configurada con:
 * - Token JWT automático en headers
 * - Manejo de errores 401 (token expirado)
 * - Timeout de 30s
 */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request: adjuntar token JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de response: manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido - cerrar sesión
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Redirigir al login si no estamos ya en la página de login
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
