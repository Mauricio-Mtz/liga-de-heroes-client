// components/ProfileInfo.jsx
const ProfileInfo = () => {
  return (
    <div>
      <h2 className="text-2xl mb-4 comic-title">Información Personal</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="comic-border p-4">
          <h3 className="font-bold mb-2">Preferencias de juego</h3>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Estilo de juego preferido</span>
              </label>
              <select className="select comic-border w-full">
                <option>Agresivo</option>
                <option>Defensivo</option>
                <option>Roaming</option>
                <option>Farmeo</option>
                <option>Soporte</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Servidor principal</span>
              </label>
              <select className="select comic-border w-full">
                <option>LAN</option>
                <option>LAS</option>
                <option>NA</option>
                <option>EUW</option>
                <option>EUNE</option>
                <option>KR</option>
              </select>
            </div>

            <button className="btn btn-primary comic-border w-full">
              GUARDAR CAMBIOS
            </button>
          </form>
        </div>

        <div className="comic-border p-4">
          <h3 className="font-bold mb-2">Datos de contacto</h3>
          <form className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo electrónico</span>
              </label>
              <input
                type="email"
                className="input comic-border w-full"
                placeholder="tu@email.com"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Discord</span>
              </label>
              <input
                type="text"
                className="input comic-border w-full"
                placeholder="usuario#0000"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Notificaciones</span>
              </label>
              <div className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" checked />
                <span>Recibir notificaciones de actualizaciones</span>
              </div>
            </div>

            <button className="btn btn-primary comic-border w-full">
              ACTUALIZAR CONTACTO
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileInfo
