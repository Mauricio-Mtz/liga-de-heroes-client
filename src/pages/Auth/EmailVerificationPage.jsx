import { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function EmailVerificationPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [verified, setVerified] = useState(null)
  const [countdown, setCountdown] = useState(null)
  const verificationAttempted = useRef(false)
  
  const navigate = useNavigate()
  const { 
    verifyEmail, 
    resendVerificationEmail, 
    error, 
    success, 
    isProcessing,
  } = useAuth()

  // Verificar token al cargar
  useEffect(() => {
    // Solo ejecutar la verificación una vez
    if (token && !verificationAttempted.current) {
      verificationAttempted.current = true // Marcar que ya se intentó verificar
      
      const verifyToken = async () => {
        const result = await verifyEmail(token)
        setVerified(result.verified)
        
        // Si la verificación fue exitosa, iniciar el contador
        if (result.verified) {
          setCountdown(5) // Comenzar con 5 segundos
        }
      }
      
      verifyToken()
    }
  }, [token, verifyEmail])

  // Efecto separado para manejar el countdown y la navegación
  useEffect(() => {
    if (countdown === null) return
    
    // No navegar inmediatamente después de establecer el contador
    if (countdown <= 0) {
      navigate('/login')
      return
    }
    
    // Actualizar el contador cada segundo
    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [countdown, navigate])

  const handleResendVerification = async () => {
    // Obtener el email del localStorage
    const email = localStorage.getItem('registeredEmail')
    
    if (!email) {
      // Este caso se maneja automáticamente en el AuthContext
      resendVerificationEmail(null)
      return
    }

    await resendVerificationEmail(email)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Verificación de Correo</h2>
          
          {isProcessing && (
            <div className="text-center py-4">
              <div className="loading loading-spinner loading-lg mb-4"></div>
              <p>Procesando solicitud...</p>
            </div>
          )}
          
          {error && (
            <div className="alert alert-error mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="alert alert-success mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span>{success}</span>
                {countdown !== null && (
                  <p className="mt-2">Redirigiendo al inicio de sesión en {countdown} segundos...</p>
                )}
              </div>
            </div>
          )}
          
          <div className="flex flex-col space-y-3 mt-4">
            {!verified && !isProcessing && (
              <button 
                className="btn btn-primary"
                onClick={handleResendVerification}
                disabled={isProcessing}
              >
                Reenviar Correo de Verificación
              </button>
            )}
            
            <Link to="/login" className="btn btn-outline">
              Volver al Inicio de Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerificationPage