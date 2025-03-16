// CharacterList.jsx - Componente principal
import { useState, useEffect } from 'react'

import {LoadingSpinner} from '@/components/common/loadings'
import {ErrorMessage, NotFoundMessage} from '@/components/common/messages'

import CharacterCard from './CharacterCard'
import CharacterFilters from './CharacterFilters'

const CharacterList = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')
  const [selectedTag, setSelectedTag] = useState('')

  const fetchCharacters = async () => {
    try {
      setLoading(true)
      const response = await fetch('/lol_data/champion.json')
      if (!response.ok) throw new Error('Error al cargar los campeones')
      const data = await response.json()

      const championsArray = Object.values(data.data).map((champion) => ({
        id: champion.id,
        key: champion.key,
        name: champion.name,
        title: champion.title,
        description: champion.blurb,
        tags: champion.tags,
        stats: champion.stats,
        icon: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/champion/${champion.image.full}`,
      }))

      setCharacters(championsArray)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(
        'No se pudieron cargar los personajes. Intenta nuevamente más tarde.'
      )
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  // Extraer todos los tags únicos de los personajes
  const allTags = characters.reduce((tags, character) => {
    if (character.tags) {
      character.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
    return tags
  }, [])

  // Filtrar personajes por nombre y tag
  const filteredCharacters = characters.filter((character) => {
    const nameMatch = character.name
      .toLowerCase()
      .includes(filter.toLowerCase())
    const tagMatch =
      selectedTag === '' ||
      (character.tags && character.tags.includes(selectedTag))
    return nameMatch && tagMatch
  })

  return (
    <>
      {/* Header y título principal */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-4 comic-title">
          Catálogo de Campeones
        </h1>
      </section>

      {/* Filtros */}
      <section>
        <CharacterFilters
          filter={filter}
          setFilter={setFilter}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </section>

      {/* Contenido principal: Loading, Error o Lista de personajes */}
      {loading ? (
        <div className="flex justify-center my-12">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="my-12">
          <ErrorMessage message={error} />
        </div>
      ) : (
        <section>
          {/* Contador de resultados */}
          <p className="text-base-content mb-2">
            {filteredCharacters.length} campeones encontrados
          </p>

          {/* Grid de personajes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredCharacters.map((character, index) => (
              <div
                key={character.id}
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'both',
                }}
              >
                <CharacterCard key={character.id} character={character} />
              </div>
            ))}
          </div>

          {/* Mensaje cuando no hay resultados */}
          {filteredCharacters.length === 0 && <NotFoundMessage />}
        </section>
      )}
    </>
  )
}

export default CharacterList
