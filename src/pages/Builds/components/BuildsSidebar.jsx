// src/pages/Builds/components/BuildsSidebar.jsx
import { useState, useEffect } from 'react'
import buildsApi from '../../../services/buildsService'
import characterService from '../../../services/characterService'

const BuildsSidebar = ({ selectedCharacterId, onCharacterSelect, onNewBuild, userId }) => {
  const [builds, setBuilds] = useState([])
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showNewBuildForm, setShowNewBuildForm] = useState(false)
  const [newBuildData, setNewBuildData] = useState({
    characterId: '',
    name: '',
    level: 1
  })

  // Cargar builds del usuario
  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        setLoading(true)
        const buildsData = await buildsApi.getUserBuilds()
        setBuilds(buildsData)
        setError(null)
      } catch (err) {
        setError('Error al cargar los builds')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchBuilds()
    }
  }, [userId])

  // Cargar lista de personajes para el selector
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const charactersData = await characterService.getAllCharacters()
        setCharacters(charactersData)
      } catch (err) {
        console.error('Error al cargar personajes:', err)
      }
    }

    fetchCharacters()
  }, [])

  // Manejar cambios en el formulario de nuevo build
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewBuildData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Crear nuevo build
  const handleCreateBuild = (e) => {
    e.preventDefault()
    
    if (!newBuildData.characterId || !newBuildData.name) {
      alert('Por favor, complete todos los campos requeridos')
      return
    }

    onNewBuild(
      newBuildData.characterId,
      newBuildData.name,
      parseInt(newBuildData.level)
    )

    // Resetear formulario
    setNewBuildData({
      characterId: '',
      name: '',
      level: 1
    })
    setShowNewBuildForm(false)
  }

  return (
    <div className="card shadow-xl comic-border bg-base-100 h-full">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-xl flex justify-between items-center">
            Mis Builds
          </h2>
          <button 
            className="btn btn-sm btn-primary" 
            onClick={() => setShowNewBuildForm(!showNewBuildForm)}
            >
            {showNewBuildForm ? 'Cancelar' : 'Nuevo'}
          </button>
        </div>

        {/* Formulario para nuevo build */}
        {showNewBuildForm && (
          <form onSubmit={handleCreateBuild} className="mb-4 p-3 bg-base-200 rounded-lg comic-border">
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Personaje</span>
              </label>
              <select 
                name="characterId"
                className="select select-bordered w-full" 
                value={newBuildData.characterId}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Seleccione un personaje</option>
                {characters.map(char => (
                  <option key={char.id} value={char.id}>
                    {char.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Nombre del Build</span>
              </label>
              <input 
                type="text" 
                name="name"
                className="input input-bordered w-full" 
                placeholder="Ej. Build de Tank"
                value={newBuildData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Nivel Inicial</span>
              </label>
              <input 
                type="number" 
                name="level"
                className="input input-bordered w-full" 
                min="1" 
                max="30"
                value={newBuildData.level}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary">Crear Build</button>
            </div>
          </form>
        )}

        {/* Lista de builds */}
        {loading ? (
          <div className="flex justify-center py-4">
            <div className="loading loading-spinner loading-md"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error">{error}</div>
        ) : builds.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No tienes builds guardados
          </div>
        ) : (
          <div className="overflow-y-auto max-h-96">
            {builds.map((build) => (
              <div 
                key={build.id} 
                className={`p-3 mb-2 cursor-pointer transition-colors hover:bg-base-200 comic-border ${
                  selectedCharacterId === build.characterId ? 'bg-primary bg-opacity-20' : ''
                }`}
                onClick={() => onCharacterSelect(build.characterId)}
              >
                <div className="font-bold">{build.name}</div>
                <div className="text-sm text-gray-600">
                  Nivel: {build.level} • Última actualización: {new Date(build.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BuildsSidebar