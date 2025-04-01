import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function PasswordResetConfirmationPage() {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isValidToken, setIsValidToken] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    
    const navigate = useNavigate()
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    const { validateResetToken, confirmPasswordReset } = useAuth()
  
    useEffect(() => {
      // Validate reset token when component mounts
      const checkToken = async () => {
        try {
          setIsLoading(true)
          const response = await validateResetToken(token)
          
          // Comprobar si la respuesta indica token válido
          if (response && response.valid) {
            setIsValidToken(true)
          } else {
            setError('El enlace de restablecimiento no es válido o ha expirado.')
          }
        } catch (err) {
          setError('El enlace de restablecimiento no es válido o ha expirado.')
          console.log("Error: ", err)
        } finally {
          setIsLoading(false)
        }
      }
      
      if (token) {
        checkToken()
      }
    }, [token, validateResetToken])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
  
      // Validaciones de contraseña
      if (newPassword.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        return
      }
      
      // Validate password match
      if (newPassword !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        return
      }
  
      try {
        const response = await confirmPasswordReset(token, newPassword)
        
        if (response && response.message) {
          setSuccess(true)
          
          // Redireccionar después de 3 segundos
          setTimeout(() => {
            navigate('/login')
          }, 3000)
        }
      } catch (err) {
        setError(err.message || 'No se pudo restablecer la contraseña')
      }
    }
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      )
    }
  
    if (!isValidToken && !isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center p-4">
          <div className="card w-full max-w-md bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-center text-error">Enlace Inválido</h2>
              <p className="text-center">
                El enlace de restablecimiento no es válido o ha expirado.
              </p>
              <div className="card-actions justify-center mt-4">
                <button 
                  className="btn btn-primary" 
                  onClick={() => navigate('/forgot-password')}
                >
                  Solicitar nuevo enlace
                </button>
              </div>
            </div>
          </div>
        </div>
      )
    }
  
    return (
      <div className="min-h-screen flex justify-center items-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-center">Restablecer Contraseña</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && (
              <div className="alert alert-success flex flex-col items-center">
                <p>Contraseña restablecida exitosamente.</p>
                <p>Serás redirigido a la página de inicio de sesión en unos segundos...</p>
              </div>
            )}
            
            {!success && (
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nueva Contraseña</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    className="input input-bordered w-full"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <label className="label">
                    <span className="label-text-alt">Mínimo 6 caracteres</span>
                  </label>
                </div>
                
                <div className="form-control mt-1">
                  <label className="label">
                    <span className="label-text">Confirmar Contraseña</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className="input input-bordered w-full"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">
                    Restablecer Contraseña
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }
  
  export default PasswordResetConfirmationPage