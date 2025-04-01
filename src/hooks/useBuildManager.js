// src/hooks/useBuildManager.js
import { useState, useEffect, useCallback, useRef } from 'react'
import useWebSocket from './useWebSocket'

// Configuración de la URL de WebSocket desde las variables de entorno
const WS_URL = import.meta.env.VITE_API_WS_URL

// Hook para gestionar builds de personajes
export function useBuildManager() {
  const [currentBuild, setCurrentBuild] = useState(null)
  const [pendingChanges, setPendingChanges] = useState(new Map())
  const [syncStatus, setSyncStatus] = useState('idle') // 'idle', 'syncing', 'synced', 'error'
  const [errorMessage, setErrorMessage] = useState(null)
  const syncTimeoutRef = useRef(null)
  const lastOperationRef = useRef(null)
  
  // Conectar con WebSocket
  const { 
    connectionStatus, 
    authStatus, 
    socketState,
    addEventListener, 
    updateBuild, 
    getBuild,
    initializeBuild,
    reconnect,
    authenticate,
    forceSyncPending
  } = useWebSocket(WS_URL)
  
  // Función para establecer un timeout de sincronización
  const setSyncTimeout = useCallback(() => {
    // Limpiar timeout existente
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current)
    }
    
    // Establecer nuevo timeout
    syncTimeoutRef.current = setTimeout(() => {
      // Si todavía estamos sincronizando después de 30 segundos, podría haber un problema
      if (syncStatus === 'syncing' && pendingChanges.size > 0) {
        console.warn('Timeout de sincronización - intentando recuperar...')
        setErrorMessage('Timeout de sincronización. Intentando recuperar...')
        
        // Intentar reconectar y forzar sincronización
        if (connectionStatus === 'connected' && authStatus === 'authenticated') {
          forceSyncPending()
        } else {
          reconnect()
        }
      }
    }, 30000) // 30 segundos de timeout
  }, [syncStatus, pendingChanges.size, connectionStatus, authStatus, reconnect, forceSyncPending])
  
  // Actualizar localmente el estado de la build según el tipo de operación
  const updateBuildLocally = useCallback((operation, data) => {
    if (!currentBuild) return;
    
    setCurrentBuild(prevBuild => {
      if (!prevBuild) return null;
      
      const updatedBuild = { ...prevBuild };
      
      switch (operation) {
        case 'add_item':
          // Verificar que el item no esté ya añadido
          if (!updatedBuild.items.some(item => item.id === data.item.id)) {
            updatedBuild.items = [...updatedBuild.items, data.item];
          }
          break;
          
        case 'remove_item':
          updatedBuild.items = updatedBuild.items.filter(item => item.id !== data.itemId);
          break;
          
        case 'level_up':
          updatedBuild.level = data.newLevel;
          break;
          
        case 'change_stat':
          updatedBuild.stats = {
            ...updatedBuild.stats,
            [data.statName]: data.newValue
          };
          break;
          
        case 'reset':
          updatedBuild.level = 1;
          updatedBuild.items = [];
          updatedBuild.stats = {};
          break;
          
        default:
          // No hacer nada para otros tipos
          return prevBuild;
      }
      
      updatedBuild.lastUpdated = new Date().toISOString();
      return updatedBuild;
    });
  }, [currentBuild]);
  
  // Configurar oyentes de eventos
  useEffect(() => {
    const removeListeners = [
      // Manejar datos de build recibidos
      addEventListener('buildData', (message) => {
        console.log('Datos de build recibidos:', message.data);
        setCurrentBuild(message.data);
        setSyncStatus('synced');
        // Limpiar timeout al recibir datos
        if (syncTimeoutRef.current) {
          clearTimeout(syncTimeoutRef.current);
          syncTimeoutRef.current = null;
        }
      }),
      
      // Manejar confirmación de sincronización
      addEventListener('syncConfirmed', (message) => {
        console.log('Sincronización confirmada:', message.changeId);
        
        // Actualizar el estado localmente si podemos encontrar la operación asociada
        pendingChanges.forEach((changeInfo, changeId) => {
          if (changeId === message.changeId && changeInfo.operation && changeInfo.data) {
            console.log('Actualizando estado local para operación:', changeInfo.operation);
            updateBuildLocally(changeInfo.operation, changeInfo.data);
          }
        });
        
        // Eliminar el cambio de la lista de pendientes
        setPendingChanges(prev => {
          const updated = new Map(prev);
          updated.delete(message.changeId);
          return updated;
        });
        
        // Si no hay más cambios pendientes, actualizar estado
        setTimeout(() => {
          setPendingChanges(current => {
            if (current.size === 0) {
              setSyncStatus('synced');
              // Limpiar timeout cuando terminamos la sincronización
              if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
                syncTimeoutRef.current = null;
              }
            }
            return current;
          });
        }, 100);
      }),
      
      // Manejar errores de sincronización
      addEventListener('syncError', (message) => {
        console.error('Error de sincronización:', message);
        setPendingChanges(prev => {
          const updated = new Map(prev);
          updated.set(message.changeId, {
            status: 'error',
            error: message.error
          });
          return updated;
        });
        setSyncStatus('error');
        setErrorMessage(message.error);
        
        // Limpiar timeout cuando hay un error
        if (syncTimeoutRef.current) {
          clearTimeout(syncTimeoutRef.current);
          syncTimeoutRef.current = null;
        }
      }),
      
      // Manejar cambios pendientes
      addEventListener('pendingChange', ({ changeId, status, operation, data }) => {
        console.log('Cambio pendiente registrado:', changeId, operation);
        setPendingChanges(prev => {
          const updated = new Map(prev);
          updated.set(changeId, { status, operation, data });
          return updated;
        });
        setSyncStatus('syncing');
        
        // Establecer timeout al empezar sincronización
        setSyncTimeout();
      }),
      
      // Manejar errores generales
      addEventListener('error', (message) => {
        setErrorMessage(message?.error || 'Error de conexión');
        setSyncStatus('error');
        
        // Limpiar timeout cuando hay un error
        if (syncTimeoutRef.current) {
          clearTimeout(syncTimeoutRef.current);
          syncTimeoutRef.current = null;
        }
      }),
      
      // Manejar notificaciones de actualización de build
      addEventListener('buildUpdateNotification', (message) => {
        console.log('Notificación de actualización recibida:', message);
        // Solo actualizar si es el build actual
        if (currentBuild && message.characterId === currentBuild.characterId) {
          setCurrentBuild(message.data);
        }
      }),
      
      // Manejar notificaciones de eliminación de build
      addEventListener('buildDeleteNotification', (message) => {
        console.log('Notificación de eliminación recibida:', message);
        // Si es el build actual, limpiar
        if (currentBuild && message.characterId === currentBuild.characterId) {
          setCurrentBuild(null);
        }
      }),
      
      // Manejar reconexiones
      addEventListener('connect', () => {
        console.log('Reconectado, verificando build actual...');
        // Cuando nos reconectamos, verificar si hay que recargar el build actual
        if (currentBuild && authStatus === 'authenticated') {
          setTimeout(() => {
            getBuild(currentBuild.characterId);
          }, 1000);
        }
      })
    ];
    
    // Limpiar oyentes al desmontar
    return () => {
      removeListeners.forEach(removeListener => removeListener());
      // Limpiar timeout al desmontar
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
        syncTimeoutRef.current = null;
      }
    };
  }, [addEventListener, currentBuild, authStatus, getBuild, setSyncTimeout, pendingChanges, updateBuildLocally]);
  
  // Reintento automático cuando el estado del socket cambia
  useEffect(() => {
    // Si el socket está abierto pero tenemos cambios pendientes, intentar sincronizar
    if (socketState === 'OPEN' && authStatus === 'authenticated' && pendingChanges.size > 0) {
      console.log('Estado del socket recuperado, intentando sincronizar cambios pendientes');
      forceSyncPending();
    }
  }, [socketState, authStatus, pendingChanges.size, forceSyncPending]);
  
  // Función para inicializar un build
  const initializeCharacterBuild = useCallback((characterId, name, level = 1, items = [], stats = {}) => {
    const buildData = { name, level, items, stats };
    
    lastOperationRef.current = {
      type: 'initialize',
      characterId,
      data: buildData,
      timestamp: Date.now()
    };
    
    return initializeBuild(characterId, buildData);
  }, [initializeBuild]);
  
  // Función para cargar un build
  const loadBuild = useCallback((characterId) => {
    lastOperationRef.current = {
      type: 'load',
      characterId,
      timestamp: Date.now()
    };
    
    const result = getBuild(characterId);
    
    // Si no se pudo obtener build por un problema de conexión, establecer timeout para reintentar
    if (!result && connectionStatus !== 'connected') {
      console.log('No se pudo obtener build, programando reintento...');
      setTimeout(() => {
        if (connectionStatus === 'connected' && authStatus === 'authenticated') {
          console.log('Reintentando obtener build...');
          getBuild(characterId);
        }
      }, 3000);
    }
    
    return result;
  }, [getBuild, connectionStatus, authStatus]);
  
  // Función para añadir un item
  const addItem = useCallback((characterId, item) => {
    lastOperationRef.current = {
      type: 'add_item',
      characterId,
      item,
      timestamp: Date.now()
    };
    
    // También actualizar localmente para una UI más responsiva
    updateBuildLocally('add_item', { item });
    
    const changeId = updateBuild(characterId, 'add_item', { item });
    
    // Registrar el tipo de operación en pendingChanges
    setPendingChanges(prev => {
      const updated = new Map(prev);
      updated.set(changeId, { 
        status: 'pending', 
        operation: 'add_item', 
        data: { item } 
      });
      return updated;
    });
    
    return changeId;
  }, [updateBuild, updateBuildLocally]);
  
  // Función para eliminar un item
  const removeItem = useCallback((characterId, itemId) => {
    lastOperationRef.current = {
      type: 'remove_item',
      characterId,
      itemId,
      timestamp: Date.now()
    };
    
    // También actualizar localmente para una UI más responsiva
    updateBuildLocally('remove_item', { itemId });
    
    const changeId = updateBuild(characterId, 'remove_item', { itemId });
    
    // Registrar el tipo de operación en pendingChanges
    setPendingChanges(prev => {
      const updated = new Map(prev);
      updated.set(changeId, { 
        status: 'pending', 
        operation: 'remove_item', 
        data: { itemId } 
      });
      return updated;
    });
    
    return changeId;
  }, [updateBuild, updateBuildLocally]);
  
  // Función para actualizar nivel
  const updateLevel = useCallback((characterId, newLevel) => {
    lastOperationRef.current = {
      type: 'level_up',
      characterId,
      newLevel,
      timestamp: Date.now()
    };
    
    // También actualizar localmente para una UI más responsiva
    updateBuildLocally('level_up', { newLevel });
    
    const changeId = updateBuild(characterId, 'level_up', { newLevel });
    
    // Registrar el tipo de operación en pendingChanges
    setPendingChanges(prev => {
      const updated = new Map(prev);
      updated.set(changeId, { 
        status: 'pending', 
        operation: 'level_up', 
        data: { newLevel } 
      });
      return updated;
    });
    
    return changeId;
  }, [updateBuild, updateBuildLocally]);
  
  // Función para actualizar estadística
  const updateStat = useCallback((characterId, statName, newValue) => {
    lastOperationRef.current = {
      type: 'change_stat',
      characterId,
      statName,
      newValue,
      timestamp: Date.now()
    };
    
    // También actualizar localmente para una UI más responsiva
    updateBuildLocally('change_stat', { statName, newValue });
    
    const changeId = updateBuild(characterId, 'change_stat', { statName, newValue });
    
    // Registrar el tipo de operación en pendingChanges
    setPendingChanges(prev => {
      const updated = new Map(prev);
      updated.set(changeId, { 
        status: 'pending', 
        operation: 'change_stat', 
        data: { statName, newValue } 
      });
      return updated;
    });
    
    return changeId;
  }, [updateBuild, updateBuildLocally]);
  
  // Función para resetear un build
  const resetBuild = useCallback((characterId) => {
    lastOperationRef.current = {
      type: 'reset',
      characterId,
      timestamp: Date.now()
    };
    
    // También actualizar localmente para una UI más responsiva
    updateBuildLocally('reset', {});
    
    // Asegurarse de enviar un objeto data para el reset
    const resetData = { resetInfo: { timestamp: new Date().toISOString() } };
    const changeId = updateBuild(characterId, 'reset', resetData);
    
    // Registrar el tipo de operación en pendingChanges
    setPendingChanges(prev => {
      const updated = new Map(prev);
      updated.set(changeId, { 
        status: 'pending', 
        operation: 'reset', 
        data: resetData
      });
      return updated;
    });
    
    return changeId;
  }, [updateBuild, updateBuildLocally]);
  
  // Función para limpiar errores
  const clearError = useCallback(() => {
    setErrorMessage(null);
    setSyncStatus(pendingChanges.size > 0 ? 'syncing' : 'synced');
  }, [pendingChanges.size]);
  
  // Función para forzar reconexión manual
  const forceReconnect = useCallback(() => {
    // Primero limpiar estados
    setErrorMessage(null);
    
    // Intentar reconectar
    reconnect();
    
    // Establecer timeout para volver a intentar cargar el build actual
    if (currentBuild) {
      setTimeout(() => {
        if (connectionStatus === 'connected' && authStatus === 'authenticated') {
          getBuild(currentBuild.characterId);
        }
      }, 2000);
    }
  }, [reconnect, currentBuild, connectionStatus, authStatus, getBuild]);
  
  // Función para reintentar la última operación
  const retryLastOperation = useCallback(() => {
    if (!lastOperationRef.current) return false;
    
    const lastOp = lastOperationRef.current;
    
    if (Date.now() - lastOp.timestamp > 300000) { // 5 minutos
      console.warn('La última operación es demasiado antigua para reintentarla');
      return false;
    }
    
    switch (lastOp.type) {
      case 'load':
        loadBuild(lastOp.characterId);
        return true;
      case 'initialize':
        // No reintentamos la inicialización para evitar duplicados
        return false;
      case 'add_item':
        addItem(lastOp.characterId, lastOp.item);
        return true;
      case 'remove_item':
        removeItem(lastOp.characterId, lastOp.itemId);
        return true;
      case 'level_up':
        updateLevel(lastOp.characterId, lastOp.newLevel);
        return true;
      case 'change_stat':
        updateStat(lastOp.characterId, lastOp.statName, lastOp.newValue);
        return true;
      case 'reset':
        resetBuild(lastOp.characterId);
        return true;
      default:
        return false;
    }
  }, [loadBuild, addItem, removeItem, updateLevel, updateStat, resetBuild]);
  
  return {
    currentBuild,
    connectionStatus,
    authStatus,
    socketState,
    syncStatus,
    errorMessage,
    pendingChanges: Array.from(pendingChanges.entries()),
    
    // Acciones de build
    initializeBuild: initializeCharacterBuild,
    loadBuild,
    addItem,
    removeItem,
    updateLevel,
    updateStat,
    resetBuild,
    clearError,
    forceReconnect,
    retryLastOperation,
    
    // Comprobar si hay cambios pendientes
    hasPendingChanges: pendingChanges.size > 0
  };
}

export default useBuildManager;