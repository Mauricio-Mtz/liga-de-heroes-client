import { Link } from 'react-router-dom'
import Hero from './Hero'
import Features from './Features'

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-16 bg-accent text-accent-content comic-border rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 comic-title">
            ¿Listo para la Aventura?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a miles de usuarios que ya están disfrutando de la experiencia
            más cómica del mundo digital.
          </p>
          <Link to="/register" className="btn btn-lg btn-primary">
            ¡Comienza Ahora!
          </Link>
        </div>
      </section>
    </>
  )
}

export default HomePage
