// src/hooks/useWebSocket.js
import { useState, useEffect, useCallback, useRef } from 'react'
import WebSocketService from '../services/websocketService'

// Map de instancias para diferentes URLs
const wsInstances = new Map()
let initializationInProgress = false

// Hook personalizado para usar el servicio WebSocket
export function useWebSocket(serverUrl, options = {}) {
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [authStatus, setAuthStatus] = useState('none') // 'none', 'pending', 'authenticated', 'failed'
  const [socketState, setSocketState] = useState('CLOSED')
  const instanceRef = useRef(null)
  
  const { autoConnect = true, delayAuth = false } = options
  
  // Crear instancia única si no existe
  useEffect(() => {
    let isMounted = true
    let statusCheckInterval = null
    
    const setupWebSocket = () => {
      // Protección contra inicializaciones múltiples
      if (initializationInProgress) {
        console.log('Inicialización de WebSocket ya en progreso, esperando...')
        setTimeout(setupWebSocket, 100)
        return
      }
      
      if (!wsInstances.has(serverUrl)) {
        console.log('Creando nueva instancia de WebSocketService para URL:', serverUrl)
        initializationInProgress = true
        wsInstances.set(serverUrl, new WebSocketService(serverUrl))
        initializationInProgress = false
      }
      
      if (isMounted) {
        // Usar la instancia específica para esta URL
        instanceRef.current = wsInstances.get(serverUrl)
        
        // Configurar oyentes
        const connectListener = () => {
          if (isMounted) {
            setConnectionStatus('connected')
            setSocketState(instanceRef.current.getSocketReadyState())
          }
        }
        
        const disconnectListener = () => {
          if (isMounted) {
            setConnectionStatus('disconnected')
            setAuthStatus('none')
            setSocketState('CLOSED')
          }
        }
        
        const authSuccessListener = () => {
          if (isMounted) setAuthStatus('authenticated')
        }
        
        const authErrorListener = () => {
          if (isMounted) setAuthStatus('failed')
        }
        
        const errorListener = (error) => {
          console.error('WebSocket error en hook:', error)
          // No cambiamos estado aquí, dejamos que el socket maneje la reconexión
        }
        
        instanceRef.current.addEventListener('connect', connectListener)
        instanceRef.current.addEventListener('disconnect', disconnectListener)
        instanceRef.current.addEventListener('authSuccess', authSuccessListener)
        instanceRef.current.addEventListener('authError', authErrorListener)
        instanceRef.current.addEventListener('error', errorListener)
        
        // Si ya está conectado, actualizar el estado
        if (instanceRef.current.isConnected) {
          setConnectionStatus('connected')
          setSocketState(instanceRef.current.getSocketReadyState())
          if (instanceRef.current.isAuthenticated) {
            setAuthStatus('authenticated')
          }
        }
        // Si no está conectado y autoConnect está activado, intentar conectar
        else if (autoConnect && !instanceRef.current._connectionAttemptInProgress) {
          instanceRef.current.connect(delayAuth)
        }
        
        // Establecer intervalo para verificar el estado real del WebSocket
        statusCheckInterval = setInterval(() => {
          if (instanceRef.current) {
            const currentState = instanceRef.current.getSocketReadyState()
            setSocketState(currentState)
            
            // Detectar inconsistencias entre el estado guardado y el real
            if (instanceRef.current.isConnected && currentState !== 'OPEN') {
              console.warn('Inconsistencia detectada: isConnected=true pero el socket no está OPEN')
              // No hacemos reconexión aquí para evitar bucles, dejamos que el socket lo maneje
            }
          }
        }, 5000)
        
        // Limpiar oyentes al desmontar
        return () => {
          if (instanceRef.current) {
            instanceRef.current.removeEventListener('connect', connectListener)
            instanceRef.current.removeEventListener('disconnect', disconnectListener)
            instanceRef.current.removeEventListener('authSuccess', authSuccessListener)
            instanceRef.current.removeEventListener('authError', authErrorListener)
            instanceRef.current.removeEventListener('error', errorListener)
          }
          
          if (statusCheckInterval) {
            clearInterval(statusCheckInterval)
          }
        }
      }
    }
    
    setupWebSocket()
    
    return () => {
      isMounted = false
      if (statusCheckInterval) {
        clearInterval(statusCheckInterval)
      }
    }
  }, [serverUrl, autoConnect, delayAuth])
  
  // Añadir función para reconectar manualmente
  const reconnect = useCallback(() => {
    if (instanceRef.current) {
      // Cerrar primero cualquier conexión existente
      instanceRef.current.disconnect()
      
      // Pequeño retraso antes de reconectar
      setTimeout(() => {
        if (instanceRef.current) {
          return instanceRef.current.connect(false)
        }
      }, 500)
      
      return true
    }
    return false
  }, [])
  
  // Añadir función para autenticar manualmente
  const authenticate = useCallback(() => {
    if (instanceRef.current) {
      const token = localStorage.getItem('token')
      if (token) {
        setAuthStatus('pending')
        return instanceRef.current.authenticate(token)
      }
    }
    return false
  }, [])

  // Función para añadir oyente
  const addEventListener = useCallback((eventName, callback) => {
    if (instanceRef.current) {
      return instanceRef.current.addEventListener(eventName, callback)
    }
    return () => {}
  }, [])

  // Función para inicializar build
  const initializeBuild = useCallback((characterId, buildData) => {
    if (instanceRef.current) {
      if (!instanceRef.current.isSocketOpen()) {
        console.warn('Intentando inicializar build pero el socket no está abierto. Reconectando...')
        instanceRef.current.connect(false)
      }
      return instanceRef.current.initializeBuild(characterId, buildData)
    }
    return null
  }, [])

  // Función para enviar actualización
  const updateBuild = useCallback((characterId, changeType, changeData) => {
    if (instanceRef.current) {
      if (!instanceRef.current.isSocketOpen()) {
        console.warn('Intentando actualizar build pero el socket no está abierto. Reconectando...')
        instanceRef.current.connect(false)
      }
      return instanceRef.current.updateBuild(
        characterId,
        changeType,
        changeData
      )
    }
    return null
  }, [])

  // Función para obtener build
  const getBuild = useCallback((characterId) => {
    if (instanceRef.current) {
      if (!instanceRef.current.isSocketOpen()) {
        console.warn('Intentando obtener build pero el socket no está abierto. Reconectando...')
        instanceRef.current.connect(false)
        
        // Programar una nueva solicitud después de un breve retraso
        setTimeout(() => {
          if (instanceRef.current && instanceRef.current.isConnected && instanceRef.current.isAuthenticated) {
            instanceRef.current.getBuild(characterId)
          }
        }, 1000)
        
        return false
      }
      return instanceRef.current.getBuild(characterId)
    }
    return false
  }, [])

  // Método para forzar la sincronización pendiente
  const forceSyncPending = useCallback(() => {
    if (instanceRef.current && instanceRef.current.isConnected && instanceRef.current.isAuthenticated) {
      if (!instanceRef.current._processingQueue) {
        instanceRef.current._processPendingChanges()
        return true
      }
    }
    return false
  }, [])

  return {
    connectionStatus,
    authStatus,
    socketState,
    addEventListener,
    initializeBuild,
    updateBuild,
    getBuild,
    reconnect,
    authenticate,
    forceSyncPending,
    instance: instanceRef.current
  }
}

export default useWebSocket