import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="hero min-h-[calc(100vh-100px)] bg-base-200 comic-border">
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <img
          src="/images/hero-illustration.jpg"
          alt="Hero Illustration"
          className="max-w-sm rounded-lg shadow-2xl comic-border"
        />
        <div className="text-center lg:text-left lg:pr-8">
          <h1 className="text-5xl font-bold comic-title">
            ¡Bienvenido a Liga de Heroes!
          </h1>
          <p className="py-6 text-xl">
            Tu nueva gestor de personajes favorito. ¡Crea, edita y comparte!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link to="/register" className="btn btn-primary">
              ¡Regístrate Ahora!
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
