// components/RoleInfo.jsx
const RoleInfo = ({ mainRole, secondaryRole }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="comic-border p-4 bg-base-200">
        <h3 className="font-bold mb-2">Rol Principal</h3>
        <div className="flex items-center">
          <span className="mr-2">🎮</span>
          <span className="font-bold">{mainRole}</span>
        </div>
      </div>

      <div className="comic-border p-4 bg-base-200">
        <h3 className="font-bold mb-2">Rol Secundario</h3>
        <div className="flex items-center">
          <span className="mr-2">🎮</span>
          <span className="font-bold">{secondaryRole}</span>
        </div>
      </div>
    </div>
  )
}

export default RoleInfo
