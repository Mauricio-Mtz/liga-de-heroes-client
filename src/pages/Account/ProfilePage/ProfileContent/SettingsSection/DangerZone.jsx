// components/DangerZone.jsx
const DangerZone = () => {
  return (
    <div className="comic-border p-4 bg-error bg-opacity-10">
      <h3 className="font-bold mb-2 text-error">Zona de peligro</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">Eliminar cuenta</p>
          <p className="text-sm opacity-70">Esta acción no se puede deshacer</p>
        </div>
        <button className="btn btn-error comic-border">
          ELIMINAR CUENTA
        </button>
      </div>
    </div>
  );
};

export default DangerZone;