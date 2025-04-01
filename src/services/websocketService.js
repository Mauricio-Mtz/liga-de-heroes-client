// src/services/websocketService.js
class WebSocketService {
  constructor(serverUrl) {
    this.serverUrl = serverUrl
    this.socket = null
    this.isConnected = false
    this.isAuthenticated = false
    this.reconnectAttempts = 0
    this.syncQueue = []
    this.eventListeners = new Map()
    this._connectionAttemptInProgress = false
    this._authInProgress = false
    this._processingQueue = false

    // Cargar cambios pendientes del almacenamiento local
    this._loadPendingChanges()
  }

  // Iniciar conexión WebSocket
  connect(delayAuth = false) {
    if (this._connectionAttemptInProgress) {
      console.log('Ya hay un intento de conexión en progreso')
      return false
    }

    if (this.socket && this.isConnected) {
      console.log('WebSocket: Ya hay una conexión activa')
      return true
    }

    if (this.socket) {
      this.disconnect()
    }

    try {
      this._connectionAttemptInProgress = true
      console.log(`Conectando a WebSocket: ${this.serverUrl}`)
      this.socket = new WebSocket(this.serverUrl)

      this.socket.onopen = () => {
        console.log('WebSocket: Conexión establecida')
        this.isConnected = true
        this.reconnectAttempts = 0
        this._connectionAttemptInProgress = false

        // Emitir evento de conexión primero
        this._emitEvent('connect')

        // Retrasar la autenticación para asegurar que la conexión esté estable
        if (!delayAuth) {
          setTimeout(() => {
            // Autenticar si hay token disponible y no está autenticado
            if (!this.isAuthenticated && !this._authInProgress) {
              const token = localStorage.getItem('token')
              if (token) {
                console.log(
                  'Intentando autenticar con token después de conexión estable'
                )
                this.authenticate(token)
              }
            }

            // Procesar cambios pendientes
            if (!this._processingQueue) {
              this._processPendingChanges()
            }
          }, 500) // Pequeño retraso para asegurar que la conexión esté estable
        }
      }

      this.socket.onclose = (event) => {
        console.log('WebSocket: Conexión cerrada')
        console.log('Código de cierre:', event.code)
        console.log('Razón:', event.reason || 'No especificada')
        console.log('Cierre limpio:', event.wasClean)

        this.isConnected = false
        this.isAuthenticated = false
        this._connectionAttemptInProgress = false
        this._authInProgress = false
        this._processingQueue = false

        // Emitir evento de desconexión
        this._emitEvent('disconnect', {
          code: event.code,
          reason: event.reason,
        })

        // Intentar reconectar con backoff exponencial
        const timeout = Math.min(
          30000,
          Math.pow(2, this.reconnectAttempts) * 1000
        )
        this.reconnectAttempts++

        console.log(`Intentando reconectar en ${timeout / 1000} segundos...`)
        setTimeout(() => this.connect(), timeout)
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket: Error', error)
        this._connectionAttemptInProgress = false

        // Emitir evento de error
        this._emitEvent('error', error)
      }

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          this._handleMessage(message)
        } catch (error) {
          console.error('Error procesando mensaje:', error)
        }
      }

      return true
    } catch (error) {
      console.error('Error creando conexión WebSocket:', error)
      this._connectionAttemptInProgress = false

      // Intentar reconectar después de un tiempo
      setTimeout(() => this.connect(), 5000)
      return false
    }
  }

  // Cerrar conexión WebSocket
  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null
      this.isConnected = false
      this.isAuthenticated = false
      this._connectionAttemptInProgress = false
      this._authInProgress = false
      this._processingQueue = false
    }
  }

  // Autenticar al usuario
  authenticate(token, retryCount = 0) {
    if (!this.isConnected) {
      console.error('No se puede autenticar: no hay conexión')
      return false
    }

    if (!token) {
      console.error('Token de autenticación vacío')
      return false
    }

    if (this._authInProgress) {
      console.log('Ya hay una autenticación en progreso')
      return true
    }

    this._authInProgress = true
    const MAX_RETRIES = 3

    try {
      // Comprobar que el socket esté realmente abierto
      if (this.socket.readyState !== WebSocket.OPEN) {
        console.warn(
          `El socket no está abierto (estado: ${this.socket.readyState})`
        )
        this._authInProgress = false

        if (retryCount < MAX_RETRIES) {
          console.log(
            `Reintentando autenticación en 1 segundo (intento ${
              retryCount + 1
            }/${MAX_RETRIES})...`
          )
          setTimeout(() => this.authenticate(token, retryCount + 1), 1000)
          return true
        } else {
          console.error('Número máximo de intentos de autenticación alcanzado')
          return false
        }
      }

      // Intentar enviar el mensaje de autenticación
      this.socket.send(
        JSON.stringify({
          type: 'auth',
          token: token,
        })
      )

      console.log('Mensaje de autenticación enviado')
      // Establecer un timeout para resetear el estado de autenticación en progreso
      // en caso de que no recibamos respuesta
      setTimeout(() => {
        if (this._authInProgress) {
          console.warn('Timeout de autenticación, reseteando estado')
          this._authInProgress = false
        }
      }, 5000)
      
      return true
    } catch (error) {
      console.error('Error al autenticar:', error)
      this._authInProgress = false

      // Reintentar si aún no hemos alcanzado el máximo
      if (retryCount < MAX_RETRIES) {
        console.log(
          `Reintentando después de error (intento ${
            retryCount + 1
          }/${MAX_RETRIES})...`
        )
        setTimeout(() => this.authenticate(token, retryCount + 1), 1000)
        return true
      }

      return false
    }
  }

  // Nuevo método: Inicializar un build
  initializeBuild(characterId, buildData) {
    // Generar ID único para el cambio
    const changeId =
      'init-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9)

    // Crear objeto de cambio
    const change = {
      id: changeId,
      characterId: characterId,
      data: buildData,
      timestamp: Date.now(),
      isInitialization: true // Marcador para identificar inicializaciones
    }

    // Guardar en almacenamiento local
    this._saveChangeLocally(change)

    // Emitir evento de cambio pendiente
    this._emitEvent('pendingChange', { 
      changeId, 
      status: 'pending',
      operation: 'initialize',
      data: buildData
    })

    // Enviar si está conectado
    if (this.isConnected && this.isAuthenticated) {
      console.log('Enviando inicialización de build al servidor...')
      
      // Enviar el mensaje con type='initialize_build' y el resto de datos
      this.socket.send(
        JSON.stringify({
          type: 'initialize_build',
          id: change.id,
          characterId: change.characterId,
          data: change.data,
          timestamp: change.timestamp
        })
      )
    } else {
      // Añadir a la cola si no hay conexión
      this.syncQueue.push(change)

      // Intentar conectar si no está conectado
      if (!this.isConnected && !this._connectionAttemptInProgress) {
        this.connect()
      }
    }

    return changeId
  }

  // Enviar una actualización del build
  updateBuild(characterId, changeType, changeData) {
    // Si es reset y no hay datos, proporcionar un objeto por defecto
    if (changeType === 'reset' && (!changeData || Object.keys(changeData).length === 0)) {
      changeData = { resetInfo: { timestamp: new Date().toISOString() } };
    }
    
    // Generar ID único para el cambio
    const changeId =
      Date.now() + '-' + Math.random().toString(36).substring(2, 9)

    // Crear objeto de cambio
    const change = {
      id: changeId,
      operation_type: changeType, // Usar operation_type en lugar de type
      characterId: characterId,
      data: changeData,
      timestamp: Date.now(),
    }

    // Guardar en almacenamiento local
    this._saveChangeLocally(change)

    // Emitir evento de cambio pendiente con operación y datos
    this._emitEvent('pendingChange', { 
      changeId, 
      status: 'pending',
      operation: changeType,
      data: changeData
    })

    // Enviar si está conectado
    if (this.isConnected && this.isAuthenticated) {
      console.log('Enviando cambio al servidor...')
      this.socket.send(
        JSON.stringify({
          type: 'update_build',
          ...change,
        })
      )
    } else {
      // Añadir a la cola si no hay conexión
      this.syncQueue.push(change)

      // Intentar conectar si no está conectado
      if (!this.isConnected && !this._connectionAttemptInProgress) {
        this.connect()
      }
    }

    return changeId
  }

  // Solicitar datos de un build
  getBuild(characterId) {
    if (!this.isConnected || !this.isAuthenticated) {
      console.error(
        'No se puede obtener build: no hay conexión o no está autenticado'
      )
      return false
    }

    this.socket.send(
      JSON.stringify({
        type: 'get_build',
        characterId: characterId,
      })
    )

    return true
  }

  // Añadir oyente para eventos
  addEventListener(eventName, callback) {
    if (!this.eventListeners.has(eventName)) {
      this.eventListeners.set(eventName, new Set())
    }

    this.eventListeners.get(eventName).add(callback)

    // Retornar función para eliminar el oyente
    return () => {
      const listeners = this.eventListeners.get(eventName)
      if (listeners) {
        listeners.delete(callback)
      }
    }
  }

  // Eliminar oyente para eventos
  removeEventListener(eventName, callback) {
    const listeners = this.eventListeners.get(eventName)
    if (listeners) {
      listeners.delete(callback)
    }
  }

  // Emitir evento
  _emitEvent(eventName, data) {
    const listeners = this.eventListeners.get(eventName)
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(data)
        } catch (error) {
          console.error(`Error en oyente de evento ${eventName}:`, error)
        }
      })
    }
  }

  // Manejar mensajes recibidos
  _handleMessage(message) {
    console.log('Mensaje recibido:', message)

    switch (message.type) {
      case 'ping':
        // Responder a los pings del servidor para mantener la conexión viva
        try {
          this.socket.send(
            JSON.stringify({
              type: 'pong',
              timestamp: Date.now(),
            })
          )
        } catch (error) {
          console.error('Error respondiendo al ping:', error)
        }
        break

      case 'connection_established':
        console.log(`Conexión establecida. ID de cliente: ${message.clientId}`)

        // Si no estamos autenticados, intentar autenticar
        if (!this.isAuthenticated && !this._authInProgress) {
          const token = localStorage.getItem('token')
          if (token) {
            console.log('Intentando autenticar después de conexión establecida')
            this.authenticate(token)
          }
        }
        break

      case 'auth_success':
        console.log('Autenticación exitosa')
        this.isAuthenticated = true
        this._authInProgress = false
        this._emitEvent('authSuccess', message)

        // Procesar cambios pendientes ahora que estamos autenticados
        if (!this._processingQueue) {
          this._processPendingChanges()
        }
        break

      case 'auth_error':
        console.error('Error de autenticación:', message.error)
        this.isAuthenticated = false
        this._authInProgress = false
        this._emitEvent('authError', message)
        break

      case 'sync_confirmation':
        // Eliminar del almacenamiento local
        this._removeConfirmedChange(message.changeId)

        this._emitEvent('syncConfirmed', message)
        
        // Continuar procesando la cola después de una confirmación
        if (this.syncQueue.length > 0 && !this._processingQueue) {
          setTimeout(() => this._processPendingChanges(), 100)
        }
        break

      case 'sync_error':
        this._emitEvent('syncError', message)
        
        // Continuar procesando la cola después de un error
        if (this.syncQueue.length > 0 && !this._processingQueue) {
          setTimeout(() => this._processPendingChanges(), 500) // Mayor retraso después de error
        }
        break

      case 'build_data':
        this._emitEvent('buildData', message)
        break

      case 'build_update_notification':
        this._emitEvent('buildUpdateNotification', message)
        break
        
      case 'build_delete_notification':
        this._emitEvent('buildDeleteNotification', message)
        break

      default:
        console.warn(`Tipo de mensaje no manejado: ${message.type}`)
    }
  }

  // Guardar cambio localmente
  _saveChangeLocally(change) {
    let changes = JSON.parse(localStorage.getItem('pendingChanges') || '[]')
    changes.push(change)
    localStorage.setItem('pendingChanges', JSON.stringify(changes))
  }

  // Eliminar cambio confirmado del almacenamiento local
  _removeConfirmedChange(changeId) {
    let changes = JSON.parse(localStorage.getItem('pendingChanges') || '[]')
    changes = changes.filter((change) => change.id !== changeId)
    localStorage.setItem('pendingChanges', JSON.stringify(changes))
  }

  // Cargar cambios pendientes del almacenamiento local
  _loadPendingChanges() {
    const changes = JSON.parse(localStorage.getItem('pendingChanges') || '[]')
    this.syncQueue = [...this.syncQueue, ...changes]
  }

  // Procesar cambios pendientes
  _processPendingChanges() {
    if (!this.isConnected || !this.isAuthenticated || this._processingQueue) {
      return
    }

    if (this.syncQueue.length === 0) {
      return
    }

    this._processingQueue = true
    console.log(`Sincronizando cambios pendientes. Total: ${this.syncQueue.length}`)

    // Procesar un solo cambio a la vez con un delay
    const processNextChange = () => {
      if (this.syncQueue.length > 0 && this.isConnected && this.isAuthenticated) {
        const change = this.syncQueue.shift()
        
        try {
          // Comprobar si es una inicialización
          if (change.isInitialization) {
            this.socket.send(
              JSON.stringify({
                type: 'initialize_build',
                id: change.id,
                characterId: change.characterId,
                data: change.data,
                timestamp: change.timestamp
              })
            )
          } else {
            this.socket.send(
              JSON.stringify({
                type: 'update_build',
                ...change,
              })
            )
          }
          
          // Esperamos la respuesta antes de procesar el siguiente
          // El procesamiento continuará en los manejadores de sync_confirmation o sync_error
        } catch (error) {
          console.error('Error enviando cambio:', error)
          // Si hay un error al enviar, marcamos como no procesando
          // e intentaremos de nuevo más tarde
          this._processingQueue = false
        }
      } else {
        // Ya no hay más cambios o perdimos conexión
        this._processingQueue = false
      }
    }

    // Iniciar el procesamiento
    processNextChange()
  }

  // Verificar estado del websocket
  getSocketReadyState() {
    if (!this.socket) return 'CLOSED'
    
    const states = ['CONNECTING', 'OPEN', 'CLOSING', 'CLOSED']
    return states[this.socket.readyState]
  }

  // Verificar si el websocket está realmente abierto
  isSocketOpen() {
    return this.socket && this.socket.readyState === WebSocket.OPEN
  }
}

export default WebSocketService