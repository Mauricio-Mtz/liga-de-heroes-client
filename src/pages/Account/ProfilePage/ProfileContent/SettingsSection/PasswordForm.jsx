// components/PasswordForm.jsx
const PasswordForm = () => {
  return (
    <div className="comic-border p-4">
      <h3 className="font-bold mb-2">Cambiar contraseña</h3>
      <form className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Contraseña actual</span>
          </label>
          <input type="password" className="input comic-border w-full" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Nueva contraseña</span>
          </label>
          <input type="password" className="input comic-border w-full" />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirmar nueva contraseña</span>
          </label>
          <input type="password" className="input comic-border w-full" />
        </div>

        <button className="btn btn-primary comic-border">
          ACTUALIZAR CONTRASEÑA
        </button>
      </form>
    </div>
  )
}

export default PasswordForm
