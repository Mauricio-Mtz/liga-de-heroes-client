// components/ItemComponents.jsx
import { formatStatValue, formatTagName } from '@/utils/itemFormatters'

// Componente para mostrar un ítem de estadística
export const StatItem = ({ label, value, icon, index }) => {
  return (
    <div
      className="flex justify-between items-center p-2 bg-base-300 comic-border"
      style={{ transform: `rotate(${index % 2 === 0 ? '0.5deg' : '-0.5deg'})` }}
    >
      <div className="font-medium">
        {icon} {label}
      </div>
      <div className="font-bold">{formatStatValue(value)}</div>
    </div>
  )
}

// Componente para las etiquetas de categoría
export const TagBadge = ({ tag, index }) => {
  return (
    <span
      className="badge badge-sm comic-border bg-secondary text-white"
      style={{
        transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`,
      }}
    >
      {formatTagName(tag)}
    </span>
  )
}

// Componente para la imagen del ítem con manejo de errores
export const ItemImage = ({ item, imageError, setImageError }) => {
  return (
    <div className="relative mb-4 flex justify-center">
      <div
        className="w-20 h-20 relative overflow-hidden comic-border bg-base-100 p-1"
        style={{ transform: 'rotate(2deg)' }}
      >
        {!imageError ? (
          <img
            src={item.icon}
            alt={item.name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.onerror = null
              setImageError(true)
              e.target.src = '/images/sinko-baro-ese.jpeg'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-300 text-xs">
            Sin imagen
          </div>
        )}
      </div>

      {/* Efecto de líneas de acción */}
      <div className="absolute w-full h-full">
        <div
          className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black opacity-70"
          style={{ transform: 'translate(-4px, -4px)' }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black opacity-70"
          style={{ transform: 'translate(4px, 4px)' }}
        ></div>
      </div>
    </div>
  )
}
