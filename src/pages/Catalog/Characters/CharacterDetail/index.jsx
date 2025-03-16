// CharacterDetail.jsx - Componente principal
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import {LoadingSpinner} from '@/components/common/loadings'
import {ErrorMessage, NotFoundMessage} from '@/components/common/messages'

import CharacterHeader from './CharacterHeader'
import TabNavigation from './TabNavigation'
import StatsTab from './StatsTab'
import AbilitiesTab from './AbilitiesTab'

const CharacterDetail = () => {
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { characterId } = useParams()
  const [activeTab, setActiveTab] = useState('stats') // Cambiado a 'stats' como pestaña por defecto

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true)
        // Construir la URL para el archivo específico del campeón
        const response = await fetch(`/lol_data/champion/${characterId}.json`)
        
        if (!response.ok)
          throw new Error('Error al cargar los datos del personaje')
  
        const data = await response.json()
        
        // Extraer los datos del campeón
        const championData = data.data && data.data[characterId]
        
        if (!championData) {
          throw new Error('Personaje no encontrado')
        }
  
        setCharacter(championData)
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setError(
          error.message || 'No se pudo cargar los detalles del personaje'
        )
        setLoading(false)
      }
    }
  
    fetchCharacterDetails()
  }, [characterId])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!character) return <NotFoundMessage />

  // Renderizado del componente principal
  return (
    <div className="">
      {/* Migas de pan */}
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <a href="/" className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Inicio
            </a>
          </li>
          <li>
            <a href="/catalog/character-list">Campeones</a>
          </li>
          <li className="font-semibold">{character.name}</li>
        </ul>
      </div>
      
      <div className=" flex flex-col gap-10">
        <CharacterHeader character={character} />
        
        <div>
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <div className="comic-border p-4">
            {activeTab === 'stats' && <StatsTab stats={character.stats} />}

            {activeTab === 'abilities' && (
              <AbilitiesTab character={character} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail