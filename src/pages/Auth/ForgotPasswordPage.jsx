import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const { requestPasswordReset } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Por favor, introduce un correo electrónico válido')
      return
    }
    
    try {
      setIsSubmitting(true)
      await requestPasswordReset(email)
      setSuccess(true)
    } catch (err) {
      setError(err.message || 'Error al solicitar restablecimiento de contraseña')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center">Recuperar Contraseña</h2>
          
          {error && <div className="alert alert-error">{error}</div>}
          
          {success ? (
            <div className="mt-4 text-center">
              <div className="alert alert-success mb-4 text-center">
                Hemos enviado un correo electrónico con instrucciones para restablecer tu contraseña.
              </div>
              <p className="text-sm text-center mb-4">
                Si no recibes el correo en unos minutos, revisa tu carpeta de spam o solicita un nuevo enlace.
              </p>
              <div className="flex justify-between flex-col gap-2">
                <Link to="/login" className="btn btn-outline">
                  Volver al inicio de sesión
                </Link>
                <button 
                  onClick={() => {
                    setSuccess(false)
                    setEmail('')
                  }}
                  className="btn btn-primary"
                >
                  Reintentar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <p className="mb-4 text-center">
                Introduce tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
              </p>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Correo Electrónico</span>
                </label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-control mt-6">
                <button 
                  type="submit" 
                  className="btn btn-primary w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Instrucciones'
                  )}
                </button>
              </div>
              
              <div className="text-center mt-4">
                <Link to="/login" className="link link-hover text-sm">
                  Volver al inicio de sesión
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage