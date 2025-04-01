// src/services/characterService.js

class CharacterService {
  // Obtiene todos los personajes
  async getAllCharacters() {
    try {
      // Cargar el archivo champion.json
      const response = await fetch('/lol_data/champion.json')
      if (!response.ok) {
        throw new Error('Error cargando datos de campeones')
      }
      
      const data = await response.json()
      const champions = data.data
      
      // Transformar el objeto de campeones en un array con los datos necesarios
      const championsArray = Object.values(champions).map(champion => ({
        id: champion.id,
        key: champion.key,
        name: champion.name,
        title: champion.title,
        blurb: champion.blurb,
        image: `/lol_data/img/champion/${champion.image.full}`,
        tags: champion.tags,
        info: champion.info
      }))
      
      return championsArray
    } catch (error) {
      console.error('Error obteniendo todos los personajes:', error)
      throw error
    }
  }
  
  // Obtiene un personaje por su ID
  async getCharacterById(championId) {
    try {
      // Cargar el archivo específico del campeón
      const response = await fetch(`/lol_data/champion/${championId}.json`)
      if (!response.ok) {
        throw new Error(`Error cargando datos del campeón ${championId}`)
      }
      
      const data = await response.json()
      const champion = data.data[championId]
      
      // Procesar y enriquecer los datos del campeón
      return {
        id: champion.id,
        key: champion.key,
        name: champion.name,
        title: champion.title,
        lore: champion.lore,
        allytips: champion.allytips,
        enemytips: champion.enemytips,
        tags: champion.tags,
        info: champion.info,
        stats: champion.stats,
        spells: champion.spells.map(spell => ({
          id: spell.id,
          name: spell.name,
          description: spell.description,
          tooltip: spell.tooltip,
          image: `/lol_data/img/spell/${spell.image.full}`,
          maxrank: spell.maxrank,
          cooldown: spell.cooldown,
          cost: spell.cost,
          range: spell.range
        })),
        passive: {
          name: champion.passive.name,
          description: champion.passive.description,
          image: `/lol_data/img/passive/${champion.passive.image.full}`
        },
        image: `/lol_data/img/champion/${champion.image.full}`,
        skins: champion.skins.map(skin => ({
          id: skin.id,
          name: skin.name,
          num: skin.num,
          image: `/lol_data/img/champion/splash/${champion.id}_${skin.num}.jpg`
        }))
      }
    } catch (error) {
      console.error(`Error obteniendo personaje ${championId}:`, error)
      throw error
    }
  }
  
  // Obtiene personajes por rol/tag
  async getCharactersByTag(tag) {
    try {
      const allChampions = await this.getAllCharacters()
      return allChampions.filter(champion => 
        champion.tags.some(t => t.toLowerCase() === tag.toLowerCase())
      )
    } catch (error) {
      console.error(`Error obteniendo personajes por tag ${tag}:`, error)
      throw error
    }
  }
  
  // Busca personajes por nombre o descripción
  async searchCharacters(query) {
    try {
      if (!query || query.trim() === '') {
        return []
      }
      
      const allChampions = await this.getAllCharacters()
      const searchTerm = query.toLowerCase()
      
      return allChampions.filter(champion => 
        champion.name.toLowerCase().includes(searchTerm) ||
        champion.title.toLowerCase().includes(searchTerm) ||
        champion.blurb.toLowerCase().includes(searchTerm)
      )
    } catch (error) {
      console.error(`Error buscando personajes con "${query}":`, error)
      throw error
    }
  }
}

export const characterService = new CharacterService()
export default characterService