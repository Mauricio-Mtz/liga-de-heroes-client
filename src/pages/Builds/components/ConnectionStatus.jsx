// src/pages/Builds/components/ConnectionStatus.jsx
import { useState } from 'react'

const ConnectionStatus = ({ 
  connectionStatus, 
  authStatus = 'none',
  syncStatus, 
  errorMessage, 
  pendingChanges = [],
  onReconnect,
  onAuthenticate,
  onClearError
}) => {
  const [expanded, setExpanded] = useState(false)
  
  // Clases y texto según estado
  const getConnectionStatusInfo = () => {
    switch (connectionStatus) {
      case 'connected':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          borderColor: 'border-green-300',
          icon: '🔵',
          text: 'Conectado'
        }
      case 'connecting':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          borderColor: 'border-blue-300',
          icon: '🔄',
          text: 'Conectando...'
        }
      case 'disconnected':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          borderColor: 'border-red-300',
          icon: '🔴',
          text: 'Desconectado'
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          borderColor: 'border-gray-300',
          icon: '❓',
          text: 'Estado desconocido'
        }
    }
  }
  
  const getAuthStatusInfo = () => {
    switch (authStatus) {
      case 'authenticated':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '✅',
          text: 'Autenticado'
        }
      case 'pending':
        return {
          bgColor: 'bg-yellow-100',
          textColor: 'text-yellow-800',
          icon: '⏳',
          text: 'Autenticando...'
        }
      case 'failed':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: '❌',
          text: 'Error de autenticación'
        }
      case 'none':
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '🔑',
          text: 'Sin autenticar'
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '❓',
          text: 'Estado desconocido'
        }
    }
  }
  
  const getSyncStatusInfo = () => {
    switch (syncStatus) {
      case 'synced':
        return {
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          icon: '✓',
          text: 'Sincronizado'
        }
      case 'syncing':
        return {
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          icon: '↻',
          text: 'Sincronizando...'
        }
      case 'error':
        return {
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          icon: '✗',
          text: 'Error de sincronización'
        }
      default:
        return {
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          icon: '-',
          text: 'Esperando cambios'
        }
    }
  }
  
  const connInfo = getConnectionStatusInfo()
  const authInfo = getAuthStatusInfo()
  const syncInfo = getSyncStatusInfo()
  
  return (
    <div className={`rounded-lg border ${connInfo.borderColor} p-3 mb-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`flex-shrink-0 rounded-full p-2 ${connInfo.bgColor}`}>
            <span role="img" aria-label="Estado de conexión">
              {connInfo.icon}
            </span>
          </div>
          
          <div>
            <h3 className={`font-semibold ${connInfo.textColor}`}>
              {connInfo.text}
            </h3>
            
            <div className="flex space-x-2 text-sm mt-1">
              <span className={`px-2 py-1 rounded ${authInfo.bgColor} ${authInfo.textColor}`}>
                {authInfo.icon} {authInfo.text}
              </span>
              
              <span className={`px-2 py-1 rounded ${syncInfo.bgColor} ${syncInfo.textColor}`}>
                {syncInfo.icon} {syncInfo.text}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {connectionStatus !== 'connected' && onReconnect && (
            <button
              onClick={onReconnect}
              className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Reconectar
            </button>
          )}
          
          {connectionStatus === 'connected' && authStatus !== 'authenticated' && onAuthenticate && (
            <button
              onClick={onAuthenticate}
              className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
            >
              Autenticar
            </button>
          )}
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
          >
            {expanded ? 'Menos detalles' : 'Más detalles'}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-3 border-t pt-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">Información de conexión</h4>
              <ul className="text-sm space-y-1">
                <li><strong>Estado:</strong> {connInfo.text}</li>
                <li><strong>Autenticación:</strong> {authInfo.text}</li>
                <li><strong>Sincronización:</strong> {syncInfo.text}</li>
                <li><strong>URL del servidor:</strong> {import.meta.env.VITE_API_WS_URL}</li>
                <li>
                  <strong>Token:</strong> {localStorage.getItem('token') ? 
                    '✓ Presente' : 
                    '✗ No encontrado'}
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Cambios pendientes ({pendingChanges.length})</h4>
              {pendingChanges.length > 0 ? (
                <ul className="text-sm max-h-32 overflow-y-auto">
                  {pendingChanges.map(([id, details]) => (
                    <li key={id} className="mb-1">
                      <span className={
                        details.status === 'pending' ? 'text-blue-600' :
                        details.status === 'error' ? 'text-red-600' : 
                        'text-green-600'
                      }>
                        {id.substring(0, 8)}... ({details.status})
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No hay cambios pendientes</p>
              )}
            </div>
          </div>
          
          {errorMessage && (
            <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded text-red-800">
              <strong>Error:</strong> {errorMessage}
              {onClearError && (
                <button
                  onClick={onClearError}
                  className="ml-2 px-2 py-0.5 bg-red-200 text-red-800 text-xs rounded hover:bg-red-300"
                >
                  Descartar
                </button>
              )}
            </div>
          )}
          
          <div className="mt-3 flex space-x-2">
            <button
              onClick={() => {
                localStorage.removeItem('pendingChanges')
                window.location.reload()
              }}
              className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
            >
              Borrar cambios locales y recargar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectionStatus