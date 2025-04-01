import { createContext, useState, useEffect } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)

  // Función para limpiar mensajes
  const clearMessages = () => {
    setError(null)
    setSuccess(null)
  }

  const login = async (email, password) => {
    try {
      setError(null)
      const response = await authService.login(email, password)

      if (response.success === false) {
        setError(response.message)
        return false
      }

      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)
      setCurrentUser(response.user)

      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const register = async (
    email,
    password,
    confirmPassword,
    summonerName,
    summonerTag
  ) => {
    try {
      setError(null)

      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        return false
      }

      const response = await authService.register(
        email,
        password,
        summonerName,
        summonerTag
      )

      if (response.success === false) {
        setError(response.message)
        return false
      }

      localStorage.setItem('user', JSON.stringify(response.user))
      localStorage.setItem('token', response.token)
      setCurrentUser(response.user)

      return true
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const verifyEmail = async (token) => {
    clearMessages()
    setIsProcessing(true)

    try {
      if (!token) {
        setError('Token de verificación no encontrado')
        return { verified: false }
      }

      const response = await authService.verifyEmail(token)

      if (response.success === false) {
        setError(response.message || 'Error al verificar el correo electrónico')
        return { verified: false }
      }

      setSuccess(
        response.message || 'Correo electrónico verificado exitosamente'
      )

      return { verified: true }
    } catch (err) {
      setError(err.message || 'Error al verificar el correo electrónico')
      return { verified: false }
    } finally {
      setIsProcessing(false)
    }
  }

  const resendVerificationEmail = async (email) => {
    clearMessages()
    setIsProcessing(true)

    try {
      if (!email) {
        setError('No se proporcionó un correo electrónico')
        return false
      }

      const response = await authService.resendVerificationEmail(email)

      if (response.success === false) {
        setError(
          response.message || 'Error al reenviar el correo de verificación'
        )
        return false
      }

      setSuccess(
        'Correo de verificación enviado. Por favor, revisa tu bandeja de entrada'
      )
      return true
    } catch (err) {
      setError(err.message || 'Error al reenviar el correo de verificación')
      return false
    } finally {
      setIsProcessing(false)
    }
  }

  const requestPasswordReset = async (email) => {
    try {
      setError(null)
      const response = await authService.requestPasswordReset(email)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const validateResetToken = async (token) => {
    try {
      setError(null)
      const response = await authService.validateResetToken(token)
      // Asegurarnos de que retornamos el objeto completo
      return response
    } catch (err) {
      setError(err.message)
      return { valid: false, message: err.message }
    }
  }

  const confirmPasswordReset = async (token, password) => {
    try {
      setError(null)
      const response = await authService.confirmPasswordReset(token, password)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const checkEmailAvailability = async (email) => {
    try {
      setError(null)
      const response = await authService.checkEmailAvailability(email)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setCurrentUser(null)
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      try {
        const user = await authService.verifyToken(token)
        setCurrentUser(user)
      } catch (err) {
        console.error('Error al verificar la autenticación:', err)
        logout() // Logout if token verification fails
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const value = {
    currentUser,
    loading,
    error,
    success,
    isProcessing,

    isAuthenticated: !!currentUser,
    clearMessages,
    login,
    register,
    verifyEmail,
    resendVerificationEmail,
    requestPasswordReset,
    validateResetToken,
    confirmPasswordReset,
    checkEmailAvailability,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
