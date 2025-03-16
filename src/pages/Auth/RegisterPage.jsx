import { useState } from 'react'
import { Link } from 'react-router-dom'

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica de registro
    console.log('Register attempt:', formData)
  }

  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center p-4">
      <div className="card w-full max-w-md min-h-[calc(100vh-110px)] bg-base-100 comic-border">
        <div className="card-body justify-between">
          <div className="text-center">
            <h1 className="text-4xl font-bold comic-title">
              ¡Regístrate Ahora!
            </h1>
            <p className="mt-2">Crea tu cuenta para empezar la aventura</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Nombre Completo</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Escribe tu nombre completo"
                className="input input-bordered w-full"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                className="input input-bordered w-full"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Mínimo 8 caracteres con letras y números"
                className="input input-bordered w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Confirmar Contraseña</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                className="input input-bordered w-full"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="label cursor-pointer justify-start gap-2">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span className="label-text text-wrap text-justify">
                  Acepto los{' '}
                  <Link to="/terms" className="link link-primary">
                    Términos y Condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link to="/privacy" className="link link-primary">
                    Política de Privacidad
                  </Link>
                </span>
              </label>
            </div>

            <div className="flex flex-col">
              <button className="btn btn-primary">¡Crear mi cuenta!</button>
            </div>
          </form>

          <section>
            <div className="divider">O regístrate con</div>

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

            <div className="text-center" style={{ '--rotation': '0deg' }}>
              <p>
                ¿Ya tienes una cuenta?{' '}
                <Link to="/login" className="link link-primary font-bold">
                  ¡Inicia sesión!
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
