// src/services/api.js
import axios from 'axios';

// Configuración base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/';

// Crear instancia de axios con configuración básica
export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manejo de errores comunes
    if (error.response) {
      // Error de servidor (401, 403, 404, 500, etc.)
      const { status } = error.response;
      
      // Si es error de autenticación
      if (status === 401) {
        // Opcional: Limpiar token y redirigir al login
        // localStorage.removeItem('token');
        // window.location.href = '/auth/login';
      }
      
      // Devolver objeto con más información sobre el error
      return Promise.reject({
        status,
        message: error.response.data?.message || 'Error en la solicitud',
        data: error.response.data
      });
    } else if (error.request) {
      // No se pudo recibir respuesta del servidor
      return Promise.reject({
        status: 0,
        message: 'No se puede conectar con el servidor'
      });
    } else {
      // Error al configurar la solicitud
      return Promise.reject({
        message: 'Error de configuración de solicitud'
      });
    }
  }
);

// Exportar la API
export default api;