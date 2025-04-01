import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

class AuthService {
  // Login method
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      })

      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Inicio de sesión fallido'
        )
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }

  // Register method
  async register(email, password, summonerName, summonerTag) {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        email,
        password,
        summonerName,
        summonerTag,
      })

      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Registro fallido')
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }

  // Verify token method
  async verifyToken(token) {
    if (!token) {
      return null
    }

    try {
      const response = await axios.get(`${API_URL}/auth/verify-token`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data.user
    } catch (error) {
      // Handle token verification errors
      if (error.response && error.response.status === 401) {
        // Token is invalid or expired
        return null
      }
      throw error
    }
  }

  // Añadir estos métodos a la clase AuthService
  async verifyEmail(token) {
    try {
      const response = await axios.get(`${API_URL}/auth/verify-email`, {
        params: { token },
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            'Error al verificar el correo electrónico'
        )
      }
      throw new Error('Error de conexión. Por favor, intenta de nuevo.')
    }
  }

  async resendVerificationEmail(email) {
    try {
      const response = await axios.post(`${API_URL}/auth/resend-verification`, {
        email,
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            'No se pudo reenviar el correo de verificación'
        )
      }
      throw new Error('Error de conexión. Por favor, intenta de nuevo.')
    }
  }
  
  // Request Password Reset
  async requestPasswordReset(email) {
    try {
      // Cambiado para coincidir con la ruta del backend
      const response = await axios.post(
        `${API_URL}/auth/forgot-password`, // Cambiar a forgot-password
        { email }
      )
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            'No se pudo solicitar el restablecimiento de contraseña'
        )
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }

  // Validate Reset Token
  async validateResetToken(token) {
    try {
      // Cambiado para coincidir con la ruta del backend
      const response = await axios.get(`${API_URL}/auth/verify-reset-token`, { // Cambiar a verify-reset-token
        params: { token },
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'Token de restablecimiento inválido'
        )
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }

  // Confirm Password Reset
  async confirmPasswordReset(token, password) {
    try {
      // Cambiado para coincidir con la ruta del backend
      const response = await axios.post(
        `${API_URL}/auth/reset-password`, // Cambiar a reset-password
        {
          token,
          newPassword: password, // Cambiar a newPassword para que coincida con el backend
        }
      )
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || 'No se pudo restablecer la contraseña'
        )
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }

  // Check Email Availability
  async checkEmailAvailability(email) {
    try {
      const response = await axios.get(`${API_URL}/auth/check-email`, {
        params: { email },
      })
      return response.data
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message ||
            'No se pudo verificar la disponibilidad del correo'
        )
      }
      throw new Error('Error de conexion. Porfavor, intenta de nuevo.')
    }
  }
}

export const authService = new AuthService()
