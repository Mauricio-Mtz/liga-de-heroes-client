// src/pages/Builds/components/CharacterBuildForm.jsx
const CharacterBuildForm = ({ build, onUpdateLevel, onResetBuild, characterId, syncStatus }) => {
  const handleLevelChange = (newLevel) => {
    if (newLevel >= 1 && newLevel <= 30) {
      onUpdateLevel(characterId, newLevel);
    }
  };
  
  // Indicador de sincronización
  const getSyncIndicator = () => {
    if (syncStatus === 'syncing') {
      return <span className="badge badge-warning">Sincronizando...</span>;
    } else if (syncStatus === 'synced') {
      return <span className="badge badge-success">Sincronizado</span>;
    } else if (syncStatus === 'error') {
      return <span className="badge badge-error">Error</span>;
    }
    return null;
  };
  
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="card-title text-2xl">Información del Personaje</h2>
        <div className="flex gap-2">
          <button 
            className="btn btn-sm btn-error" 
            onClick={onResetBuild}
          >
            Resetear Build
          </button>
        </div>
      </div>
      
      {!build ? (
        <div className="flex justify-center py-4">
          <div className="loading loading-spinner loading-md"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre del Build</span>
              {getSyncIndicator()}
            </label>
            <input 
              type="text" 
              className="input input-bordered" 
              value={build.name || ''} 
              disabled
            />
            <label className="label">
              <span className="label-text-alt">El nombre no se puede cambiar</span>
            </label>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nivel del Personaje</span>
            </label>
            <div className="flex items-center">
              <button 
                className="btn btn-square btn-sm" 
                onClick={() => handleLevelChange((build.level || 1) - 1)}
                disabled={build.level <= 1}
              >
                -
              </button>
              <input 
                type="number" 
                className="input input-bordered mx-2 text-center" 
                value={build.level || 1} 
                readOnly
                style={{ width: '80px' }}
              />
              <button 
                className="btn btn-square btn-sm" 
                onClick={() => handleLevelChange((build.level || 1) + 1)}
                disabled={build.level >= 30}
              >
                +
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt">Nivel 1-30</span>
            </label>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">Última actualización</span>
            </label>
            <div className="p-3 bg-base-200 rounded-lg h-12 flex items-center">
              {build.lastUpdated ? new Date(build.lastUpdated).toLocaleString() : 'N/A'}
            </div>
          </div>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text">ID del Personaje</span>
            </label>
            <div className="p-3 bg-base-200 rounded-lg h-12 flex items-center overflow-hidden text-ellipsis">
              {build.characterId || characterId || 'N/A'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterBuildForm;