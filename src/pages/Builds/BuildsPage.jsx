// src/pages/Builds/BuildsPage.jsx
import { useState, useEffect } from 'react'
import { useBuildManager } from '@/hooks/useBuildManager'
import BuildsSidebar from './components/BuildsSidebar'
import CharacterBuildForm from './components/CharacterBuildForm'
import ItemsList from './components/ItemsList'
import StatsPanel from './components/StatsPanel'
import ConnectionStatus from './components/ConnectionStatus'
import EquippedItemsList from './components/EquippedItemsList'
import { useAuth } from '../../hooks/useAuth'
import useWebSocket from '../../hooks/useWebSocket'

// Configuración de la URL de WebSocket desde las variables de entorno
const WS_URL = import.meta.env.VITE_API_WS_URL || 'ws://localhost:3000/ws'

const BuildsPage = () => {
  const { currentUser } = useAuth()
  const [activeTab, setActiveTab] = useState('character')
  const [selectedCharacterId, setSelectedCharacterId] = useState(null)
  
  // Conectar directamente con WebSocket para obtener funciones de reconexión y autenticación
  const { reconnect, authenticate, authStatus } = useWebSocket(WS_URL)
  
  const {
    currentBuild,
    connectionStatus,
    syncStatus,
    errorMessage,
    pendingChanges,
    initializeBuild,
    loadBuild,
    addItem,
    removeItem,
    updateLevel,
    updateStat,
    resetBuild,
    clearError,
    hasPendingChanges
  } = useBuildManager()
  
  // Cargar build cuando cambia el characterId seleccionado
  useEffect(() => {
    if (selectedCharacterId) {
      loadBuild(selectedCharacterId)
    }
  }, [selectedCharacterId, loadBuild])
  
  // Manejar cambio de personaje
  const handleCharacterSelect = (characterId) => {
    if (hasPendingChanges) {
      if (window.confirm('Hay cambios pendientes que podrían perderse. ¿Desea continuar?')) {
        setSelectedCharacterId(characterId)
      }
    } else {
      setSelectedCharacterId(characterId)
    }
  }
  
  // Manejar creación de nuevo build
  const handleNewBuild = (characterId, name, level) => {
    initializeBuild(characterId, name, level)
    setSelectedCharacterId(characterId)
  }
  
  // Manejar reset de build
  const handleResetBuild = () => {
    if (window.confirm('¿Está seguro de que desea resetear este build? Esta acción no se puede deshacer.')) {
      resetBuild(selectedCharacterId)
    }
  }
  
  return (
    <div className="container mx-auto p-4">
      {/* Barra de estado de conexión flotante */}
      {/* <ConnectionStatus 
        connectionStatus={connectionStatus}
        authStatus={authStatus} 
        syncStatus={syncStatus} 
        errorMessage={errorMessage}
        pendingChanges={pendingChanges}
        onReconnect={reconnect}
        onAuthenticate={authenticate}
        onClearError={clearError}
      /> */}
      
      {/* Alerta de error */}
      {errorMessage && (
        <div className="alert alert-error mb-4">
          <div className="flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                className="w-6 h-6 mx-2 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636">
              </path>
            </svg>
            <label>{errorMessage}</label>
          </div>
          <button className="btn btn-sm btn-circle" onClick={clearError}>✕</button>
        </div>
      )}
      
      <h1 className="text-3xl font-bold mb-6">Sistema de Builds</h1>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar con lista de builds */}
        <div className="w-full lg:w-1/4">
          <BuildsSidebar 
            selectedCharacterId={selectedCharacterId}
            onCharacterSelect={handleCharacterSelect}
            onNewBuild={handleNewBuild}
            userId={currentUser?.userId}
          />
        </div>
        
        {/* Área principal de edición */}
        <div className="w-full lg:w-3/4">
          {!selectedCharacterId ? (
            <div className="card shadow-xl comic-border bg-base-100 h-full">
              <div className="card-body">
                <h2 className="card-title text-xl text-center">Seleccione un personaje o cree un nuevo build</h2>
                <p className="text-center text-gray-600">
                  Utilice el panel izquierdo para seleccionar un build existente o crear uno nuevo.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Pestañas para navegación */}
              <div className="tabs tabs-boxed mb-6">
                <a 
                  className={`tab ${activeTab === 'character' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('character')}
                >
                  Personaje
                </a>
                <a 
                  className={`tab ${activeTab === 'items' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('items')}
                >
                  Items
                </a>
                <a 
                  className={`tab ${activeTab === 'stats' ? 'tab-active' : ''}`}
                  onClick={() => setActiveTab('stats')}
                >
                  Estadísticas
                </a>
              </div>
              
              {/* Contenido según la pestaña activa */}
              <div className="card shadow-xl comic-border bg-base-100">
                <div className="card-body">
                  {activeTab === 'character' && (
                    <div>
                      <CharacterBuildForm 
                        build={currentBuild}
                        onUpdateLevel={updateLevel}
                        onResetBuild={handleResetBuild}
                        characterId={selectedCharacterId}
                        syncStatus={syncStatus}
                      />
                      
                      <div className="divider">Items Equipados</div>
                      
                      <EquippedItemsList 
                        items={currentBuild?.items || []}
                        onRemoveItem={(itemId) => removeItem(selectedCharacterId, itemId)}
                      />
                    </div>
                  )}
                  
                  {activeTab === 'items' && (
                    <ItemsList 
                      equippedItems={currentBuild?.items || []}
                      onAddItem={(item) => addItem(selectedCharacterId, item)}
                    />
                  )}
                  
                  {activeTab === 'stats' && (
                    <StatsPanel 
                      stats={currentBuild?.stats || {}}
                      items={currentBuild?.items || []}
                      level={currentBuild?.level || 1}
                      onUpdateStat={(statName, value) => updateStat(selectedCharacterId, statName, value)}
                    />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default BuildsPage