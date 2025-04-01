// ItemCard.jsx
import { useItemCard } from '@/hooks/ui/useItemCard'
import { StatItem, TagBadge, ItemImage } from './ItemComponents'
import { formatStatName, getStatIcon } from '@/utils/itemFormatters'

const ItemCard = ({ item }) => {
  const {
    imageError,
    setImageError,
    handleCardClick,
    getItemPrice,
    hasValidStats,
  } = useItemCard(item)

  return (
    <div
      className="card comic-border bg-base-200 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
      onClick={handleCardClick}
      style={{ transform: 'rotate(-0.5deg)' }}
    >
      {/* Header de la tarjeta con nombre */}
      <div
        className="card-title p-3 bg-base-300 border-b-2 border-black flex justify-between items-center"
        style={{ minHeight: '70px' }}
      >
        <h3 className="text-lg font-bold truncate comic-text">{item.name}</h3>
        <div
          className="badge badge-lg bg-primary text-white border-2 border-black"
          style={{ transform: 'rotate(3deg)' }}
        >
          {getItemPrice()}
        </div>
      </div>

      <div className="p-4">
        {/* Contenedor de imagen con efecto */}
        <ItemImage 
          item={item} 
          imageError={imageError} 
          setImageError={setImageError} 
        />

        {/* Contenido de la tarjeta */}
        <div className="card-body p-0">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {item.tags &&
              item.tags.map((tag, index) => (
                <TagBadge key={index} tag={tag} index={index} />
              ))}
          </div>

          {/* Estadísticas si existen */}
          {hasValidStats() && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.entries(item.stats).map(
                ([key, value], index) =>
                  value !== 0 &&
                  value !== null &&
                  value !== undefined && (
                    <StatItem
                      key={key}
                      label={formatStatName(key)}
                      value={value}
                      icon={getStatIcon(key)}
                      index={index}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ItemCard