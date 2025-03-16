import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <section className="min-h-[calc(100vh-160px)] flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center text-center max-w-2xl">
        <div className="relative">
          <h1
            className="comic-title text-8xl font-bold text-error"
            style={{ transform: 'rotate(-3deg)' }}
          >
            404
          </h1>
          <div
            className="comic-burst absolute -top-8 -right-8 w-16 h-16 bg-warning rounded-full flex items-center justify-center"
            style={{ '--rotation': '-5deg' }}
          >
            <span className="text-lg font-bold text-black">¡Oops!</span>
          </div>
        </div>

        <h2 className="comic-title text-4xl font-bold text-primary">
          ¡Página no encontrada!
        </h2>

        <p className="text-lg">
          Parece que te has perdido en algún universo paralelo. Esta página no
          existe en nuestra dimensión.
        </p>

        <div className="flex flex-col gap-4 w-full">
          <Link to="/" className="btn btn-primary btn-lg w-full">
            Volver al inicio
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary btn-lg w-full"
          >
            Regresar
          </button>
        </div>

        <div className="relative">
          <div className="comic-border p-6 bg-base-200">
            <p className="text-lg font-bold mb-2">Mientras tanto...</p>
            <p>
              ¿Por qué no intentas buscar lo que necesitas o contactar con
              nuestro equipo de superhéroes?
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFoundPage
