// src/services/itemsService.js

class ItemsService {
  // Obtiene todos los ítems
  async getAllItems() {
    try {
      // Cargar el archivo item.json
      const response = await fetch('/lol_data/item.json')
      if (!response.ok) {
        throw new Error('Error cargando datos de ítems')
      }
      
      const data = await response.json()
      const items = data.data
      
      // Transformar el objeto de ítems en un array con los datos necesarios
      const itemsArray = Object.entries(items).map(([id, item]) => ({
        id,
        name: item.name,
        description: item.description,
        plaintext: item.plaintext,
        gold: item.gold,
        image: `/lol_data/img/item/${item.image.full}`,
        stats: item.stats || {},
        tags: item.tags || [],
        maps: item.maps,
        into: item.into || [],
        from: item.from || [],
        inStore: item.inStore !== false, // Por defecto, está en la tienda
        requiredChampion: item.requiredChampion || null,
        requiredAlly: item.requiredAlly || null
      }))
      
      // Filtrar sólo ítems disponibles en la tienda
      return itemsArray.filter(item => item.inStore && !item.requiredChampion && !item.requiredAlly)
    } catch (error) {
      console.error('Error obteniendo todos los ítems:', error)
      throw error
    }
  }
  
  // Obtiene un ítem por su ID
  async getItemById(itemId) {
    try {
      const allItems = await this.getAllItems()
      const item = allItems.find(item => item.id === itemId)
      
      if (!item) {
        throw new Error(`Ítem con ID ${itemId} no encontrado`)
      }
      
      // Obtener información adicional sobre builds
      const items = await this.getAllItems()
      
      // Obtener ítems que se construyen a partir de este
      const buildsInto = items.filter(i => 
        i.from && i.from.includes(itemId)
      )
      
      // Obtener componentes utilizados para construir este ítem
      const components = item.from ? items.filter(i => 
        item.from.includes(i.id)
      ) : []
      
      return {
        ...item,
        buildsInto,
        components
      }
    } catch (error) {
      console.error(`Error obteniendo ítem ${itemId}:`, error)
      throw error
    }
  }
  
  // Obtiene ítems por categoría/tag
  async getItemsByTag(tag) {
    try {
      const allItems = await this.getAllItems()
      return allItems.filter(item => 
        item.tags && item.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      )
    } catch (error) {
      console.error(`Error obteniendo ítems por tag ${tag}:`, error)
      throw error
    }
  }
  
  // Busca ítems por nombre o descripción
  async searchItems(query) {
    try {
      if (!query || query.trim() === '') {
        return []
      }
      
      const allItems = await this.getAllItems()
      const searchTerm = query.toLowerCase()
      
      return allItems.filter(item => 
        item.name.toLowerCase().includes(searchTerm) ||
        (item.plaintext && item.plaintext.toLowerCase().includes(searchTerm)) ||
        (item.description && item.description.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      console.error(`Error buscando ítems con "${query}":`, error)
      throw error
    }
  }
  
  // Obtiene ítems básicos (que no requieren otros ítems para construirse)
  async getBasicItems() {
    try {
      const allItems = await this.getAllItems()
      return allItems.filter(item => !item.from || item.from.length === 0)
    } catch (error) {
      console.error('Error obteniendo ítems básicos:', error)
      throw error
    }
  }
  
  // Obtiene ítems avanzados (que requieren otros ítems para construirse)
  async getAdvancedItems() {
    try {
      const allItems = await this.getAllItems()
      return allItems.filter(item => item.from && item.from.length > 0)
    } catch (error) {
      console.error('Error obteniendo ítems avanzados:', error)
      throw error
    }
  }
  
  // Obtiene ítems legendarios (finales en el árbol de construcción)
  async getLegendaryItems() {
    try {
      const allItems = await this.getAllItems()
      return allItems.filter(item => 
        (item.from && item.from.length > 0) && 
        (!item.into || item.into.length === 0)
      )
    } catch (error) {
      console.error('Error obteniendo ítems legendarios:', error)
      throw error
    }
  }
  
  // Obtiene ítems por rango de precio
  async getItemsByPriceRange(minPrice, maxPrice) {
    try {
      const allItems = await this.getAllItems()
      return allItems.filter(item => 
        item.gold &&
        item.gold.total >= minPrice &&
        item.gold.total <= maxPrice
      )
    } catch (error) {
      console.error(`Error obteniendo ítems por rango de precio (${minPrice}-${maxPrice}):`, error)
      throw error
    }
  }
  
  // Obtiene árbol de construcción para un ítem
  async getItemBuildTree(itemId) {
    try {
      const targetItem = await this.getItemById(itemId)
      const allItems = await this.getAllItems()
      
      // Función recursiva para construir árbol
      const buildTree = (id) => {
        const item = allItems.find(i => i.id === id)
        if (!item) return null
        
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          gold: item.gold,
          components: item.from ? item.from.map(compId => buildTree(compId)).filter(Boolean) : []
        }
      }
      
      return buildTree(itemId)
    } catch (error) {
      console.error(`Error obteniendo árbol de construcción para ítem ${itemId}:`, error)
      throw error
    }
  }
}

export const itemsService = new ItemsService()
export default itemsService