import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { LoadingSpinner } from '@/components/common/loadings'
import { ErrorMessage, NotFoundMessage } from '@/components/common/messages'

import ItemHeader from './ItemHeader'
import TabNavigation from './TabNavigation'
import DescriptionTab from './DescriptionTab'
import StatsTab from './StatsTab'
import CraftTab from './CraftTab'

const ItemDetail = () => {
  const [item, setItem] = useState(null)
  const [allItems, setAllItems] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { itemId } = useParams()
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/lol_data/item.json`)
        
        if (!response.ok)
          throw new Error('Error al cargar los datos del item')
  
        const data = await response.json()
        
        const itemData = data.data && data.data[itemId]
        
        if (!itemData) {
          throw new Error('Item no encontrado')
        }
  
        setItem(itemData)
        setAllItems(data.data)
        setLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setError(
          error.message || 'No se pudo cargar los detalles del item'
        )
        setLoading(false)
      }
    }
  
    fetchItemDetails()
  }, [itemId])

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />
  if (!item) return <NotFoundMessage />

  return (
    <div className="container mx-auto px-4 py-6">
      <ItemHeader item={item} />
      
      <div className="mt-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="mt-4 p-4 bg-white rounded-lg shadow">
          {activeTab === 'description' && <DescriptionTab item={item} />}
          {activeTab === 'stats' && <StatsTab item={item} />}
          {activeTab === 'craft' && <CraftTab item={item} allItems={allItems} />}
        </div>
      </div>
    </div>
  )
}

export default ItemDetail