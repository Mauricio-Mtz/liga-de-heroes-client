// components/SecurityOptions.jsx
const SecurityOptions = () => {
  return (
    <div className="comic-border p-4">
      <h3 className="font-bold mb-2">Opciones de seguridad</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">Autenticación de dos factores</p>
            <p className="text-sm opacity-70">Añade una capa extra de seguridad</p>
          </div>
          <button className="btn btn-secondary comic-border">
            ACTIVAR 2FA
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold">Sesiones activas</p>
            <p className="text-sm opacity-70">Gestiona los dispositivos conectados</p>
          </div>
          <button className="btn btn-secondary comic-border">
            VER SESIONES
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityOptions;