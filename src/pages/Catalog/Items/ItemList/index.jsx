// ItemList.jsx - Componente principal mejorado
import { useState, useEffect } from 'react'

import {LoadingSpinner} from '@/components/common/loadings'
import {ErrorMessage, NotFoundMessage} from '@/components/common/messages'

import ItemCard from './ItemCard'
import ItemFilters from './ItemFilters'

const ItemList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  
  const fetchItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/lol_data/item.json')
      if (!response.ok) throw new Error('Error al cargar los items')
      const data = await response.json()

      // Transformar los datos de ítems
      const itemsArray = Object.entries(data.data).map(([id, item]) => ({
        id,
        name: item.name,
        description: item.description,
        plaintext: item.plaintext,
        gold: item.gold,
        stats: item.stats,
        tags: item.tags,
        icon: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/${item.image.full}`,
      }))

      setItems(itemsArray)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setError(
        'No se pudieron cargar los items. Intenta nuevamente más tarde.'
      )
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  // Extraer todos los tags únicos de los ítems
  const allTags = items.reduce((tags, item) => {
    if (item.tags) {
      item.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag)
        }
      })
    }
    return tags;
  }, []).sort();

  // Filtrar items por nombre y tag
  const filteredItems = items.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(filter.toLowerCase())
    const tagMatch =
      selectedTag === '' ||
      (item.tags && item.tags.includes(selectedTag))
    return nameMatch && tagMatch
  })

  return (
    <>
      {/* Header y título principal */}
      <section>
        <h1 className="text-3xl font-bold text-center mb-4 comic-title">
          Catálogo de Items
        </h1>
      </section>

      {/* Filtros */}
      <section>
        <ItemFilters
          filter={filter}
          setFilter={setFilter}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          allTags={allTags}
        />
      </section>

      {/* Contenido principal: Loading, Error o Lista de items */}
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
            {filteredItems.length} items encontrados
          </p>

          {/* Grid de items con animación de entrada */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          >
            {filteredItems.map((item, index) => (
              <div 
                key={item.id} 
                className="animate-fadeIn"
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'both'
                }}
              >
                <ItemCard item={item} />
              </div>
            ))}
          </div>

          {/* Mensaje cuando no hay resultados */}
          {filteredItems.length === 0 && (
            <div className="my-12">
              <NotFoundMessage />
            </div>
          )}
        </section>
      )}
    </>
  )
}

// Añadimos la animación de fadeIn para la entrada de las tarjetas
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
document.head.appendChild(style);

export default ItemList