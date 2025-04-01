import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    summonerName: '',
    summonerTag: '',
  })

  const navigate = useNavigate()
  const { register, error } = useAuth()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const { email, password, confirmPassword, summonerName, summonerTag } = formData
  
      const response = await register(email, password, confirmPassword, summonerName, summonerTag)
      console.log(error)
      if (response) {
        // Guardar email para posible reenvío
        localStorage.setItem('registeredEmail', email)
        
        // Mensaje de verificación pendiente
        alert('Por favor, verifica tu correo electrónico')
        
        navigate('/login')
      }
    } catch (err) {
      console.error('Error en el registro:', err)
    }
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
            {/* Error messages */}
            {error && (
              <div className="alert alert-error mb-4">
                <span>{error}</span>
              </div>
            )}

            {/* Summoner Name and Tag */}
            <div className='flex gap-4'>
              <div className="flex flex-col w-2/3">
                <label className="label">
                  <span className="label-text">Nombre de Invocador</span>
                </label>
                <input
                  type="text"
                  name="summonerName"
                  placeholder="Nombre de tu cuenta de League of Legends"
                  className="input input-bordered w-full"
                  value={formData.summonerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label className="label">
                  <span className="label-text">Etiqueta</span>
                </label>
                <input
                  type="text"
                  name="summonerTag"
                  placeholder="#EUW"
                  className="input input-bordered w-full"
                  value={formData.summonerTag}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Input with Validation */}
            <div className="flex flex-col">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="flex items-center space-x-2">
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
            </div>

            {/* Password Inputs */}
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
                minLength={8}
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
                minLength={8}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col mt-4">
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                ¡Crear mi cuenta!
              </button>
            </div>
          </form>

          <section>
            <div className="divider"></div>

            <div className="text-center">
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