import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // Usa el hook de autenticación
  const { login, error } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Usa la función login del contexto
      const response = await login(email, password)

      // Si el login es exitoso, redirige al usuario
      if (response) {
        navigate('/catalog/character-list')
      }
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
              <button type="submit" className="btn btn-primary">
                Iniciar Sesión
              </button>
            </div>
          </form>

          <section>
            <div className="divider"></div>

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
