// hooks/useItemCard.js
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { cleanDescription } from '@/utils/itemFormatters'

export const useItemCard = (item) => {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const handleCardClick = () => {
    navigate(`/catalog/item-detail/${item.id}`)
  }

  // Obtener el precio del ítem
  const getItemPrice = () => {
    if (!item.gold) return 'Sin precio'
    return `${item.gold.total} oro`
  }

  // Verificar si existen estadísticas válidas
  const hasValidStats = () => {
    return (
      item.stats &&
      typeof item.stats === 'object' &&
      Object.keys(item.stats).length > 0 &&
      Object.values(item.stats).some(
        (value) => value !== 0 && value !== null && value !== undefined
      )
    )
  }

  // Limpiar la descripción para mostrarla
  const description = cleanDescription(item.description, item.plaintext)

  return {
    imageError,
    setImageError,
    handleCardClick,
    getItemPrice,
    hasValidStats,
    description,
  }
}
