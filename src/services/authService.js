// services/authService.js
// Datos de prueba para desarrollo
const MOCK_USER = {
    id: '1',
    name: 'Mauricio',
    email: 'maurimtz07@gmail.com',
    role: 'user'
  };
  
  const MOCK_TOKEN = 'mock-jwt-token-xyz123456789';
  
  // Credenciales permitidas
  const VALID_CREDENTIALS = {
    email: 'maurimtz07@gmail.com',
    password: 'Mau1224!"'
  };
  
  // Simula una pequeña demora para imitar una llamada a API
  const apiDelay = () => new Promise(resolve => setTimeout(resolve, 500));
  
  export const authService = {
    // Función para iniciar sesión
    login: async (email, password) => {
      await apiDelay();
      
      // Verificar credenciales hardcodeadas
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        // Guardar token en localStorage
        localStorage.setItem('authToken', MOCK_TOKEN);
        console.log("SESION INICIADA");
        return MOCK_USER;
      } else {
        throw new Error('Credenciales incorrectas');
      }
    },
  
    // Función para registrarse (simulada)
    register: async (email, password, name) => {
      await apiDelay();
      
      // En modo desarrollo, simplemente simulamos un registro exitoso
      console.log("REGISTRO COMPLETADO");
      return { 
        success: true, 
        message: 'Registro exitoso. Por favor inicia sesión.' 
      };
    },
  
    // Función para cerrar sesión
    logout: () => {
      console.log("SESION TERMINADA");
      localStorage.removeItem('authToken');
    },
  
    // Verificar si hay un token válido
    verifyToken: async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return null;
      }
      
      // En modo desarrollo, verificamos si el token coincide con nuestro token de prueba
      if (token === MOCK_TOKEN) {
        return MOCK_USER;
      }
      
      // Token inválido
      localStorage.removeItem('authToken');
      return null;
    }
  };