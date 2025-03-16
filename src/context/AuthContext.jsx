// context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para iniciar sesión que utiliza el servicio
  const login = async (email, password) => {
    try {
      setError(null);
      const user = await authService.login(email, password);
      setCurrentUser(user);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para registrarse que utiliza el servicio
  const register = async (email, password, name) => {
    try {
      setError(null);
      return await authService.register(email, password, name);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Función para cerrar sesión que utiliza el servicio
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Verificar si hay una sesión activa al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.verifyToken();
        setCurrentUser(user);
      } catch (err) {
        console.error('Error al verificar la autenticación:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Calculamos isAuthenticated basado en la presencia de currentUser
  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};