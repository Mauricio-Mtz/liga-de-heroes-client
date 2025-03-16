import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const navigate = useNavigate()

  // Usa el hook de autenticación
  const { login, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Usa la función login del contexto
      await login(email, password)
      // Si el login es exitoso, redirige al usuario
      navigate('/catalog/character-list') // o la ruta que prefieras
    } catch (err) {
      // El error ya se maneja en el contexto, pero puedes hacer algo adicional aquí si quieres
      console.error('Error en el inicio de sesión:', err)
    }
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center p-4">
      <div className="card w-full max-w-md min-h-[calc(100vh-110px)] bg-base-100 comic-border">
        <div className="card-body justify-between">
          <div className="text-center">
            <h1 className="text-4xl font-bold comic-title">¡Iniciar Sesión!</h1>
            <p className="mt-2">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Mostrar mensaje de error si existe */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Email</span>
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

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                placeholder="Tu contraseña secreta"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <Link
                  to="/forgot-password"
                  className="label-text-alt link link-hover w-full text-center"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </label>
            </div>

            <div className="flex flex-col">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="label-text">Recordarme</span>
              </label>
            </div>

            <div className="flex flex-col">
              <button className="btn btn-primary">Iniciar Sesión</button>
            </div>
          </form>

          <section>
            <div className="divider">O</div>

            <div className="grid grid-cols-3 gap-3">
              <button className="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </button>
              <button className="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </button>
              <button className="btn btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </button>
            </div>

            <div className="text-center">
              <p>
                ¿No tienes una cuenta?{' '}
                <Link to="/register" className="link link-primary font-bold">
                  ¡Regístrate ahora!
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
