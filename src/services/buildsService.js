// src/services/buildsService.js
import { api } from './api'

// Clase para el servicio de API REST para builds
class BuildsService {
  // Obtener todos los builds del usuario
  async getUserBuilds() {
    try {
      const response = await api.get('/builds')
      return response.data.data
    } catch (error) {
      console.error('Error obteniendo builds del usuario:', error)
      throw error
    }
  }
  
  // Obtener un build específico
  async getBuild(characterId) {
    try {
      const response = await api.get(`/builds/${characterId}`)
      return response.data.data
    } catch (error) {
      console.error(`Error obteniendo build ${characterId}:`, error)
      throw error
    }
  }
  
  // Inicializar un nuevo build
  async initializeBuild(characterId, buildData) {
    console.log("Inicializando build", characterId, buildData)
    try {
      const response = await api.post(`/builds/${characterId}`, buildData)
      console.log("Respuesta", response)
      return response.data.data
    } catch (error) {
      console.error(`Error inicializando build ${characterId}:`, error)
      throw error
    }
  }
  
  // Eliminar un build
  async deleteBuild(characterId) {
    try {
      const response = await api.delete(`/builds/${characterId}`)
      return response.data
    } catch (error) {
      console.error(`Error eliminando build ${characterId}:`, error)
      throw error
    }
  }
}

export const buildsApi = new BuildsService()
export default buildsApi