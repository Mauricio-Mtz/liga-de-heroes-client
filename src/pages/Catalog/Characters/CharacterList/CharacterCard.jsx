import { useNavigate } from 'react-router-dom'

// CharacterCard.jsx - Componente mejorado para tarjetas de personajes
const CharacterCard = ({ character }) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/catalog/character-detail/${character.id}`)
  }
  // console.log(character)
  return (
    <div
      className="bg-base-100 rounded-lg shadow-lg overflow-hidden cursor-pointer comic-border transform transition-all duration-300 hover:shadow-xl hover:scale-105"
      onClick={handleCardClick}
    >
      {/* Header de la tarjeta con nombre y título */}
      <div className="bg-secondary text-primary-content p-3">
        <h2 className="font-bold text-lg truncate">{character.name}</h2>
        <p className="text-xs opacity-90 truncate">{character.title}</p>
      </div>

      <div className="flex flex-col sm:flex-row">
        {/* Contenedor de imagen con mejor manejo para imágenes pixeladas */}
        <div className="relative w-full sm:w-1/3 h-40 bg-base-200 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <img
              src={character.icon}
              alt={character.name}
              loading="lazy" // Carga diferida
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-110"
              style={{
                imageRendering: 'auto',
                filter: 'contrast(1.05) brightness(1.05)',
              }}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/sinko-baro-ese.jpeg'
              }}
            />
          </div>
          {/* Sutiles efectos de sombra y gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-base-100/30 pointer-events-none"></div>
        </div>

        {/* Contenido de la tarjeta */}
        <div className="p-4 sm:w-2/3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-2 justify-end">
            {character.tags &&
              character.tags.map((tag) => (
                <span
                  key={`${character.id}-${tag}`}
                  className="badge badge-secondary text-xs px-2 py-0.5 text-center"
                >
                  {tag}
                </span>
              ))}
          </div>

          {/* Descripción */}
          <div className="mt-1 mb-2">
            <p className="text-xs line-clamp-2 text-base-content/80 text-justify">
              {character.description || 'No hay descripción disponible.'}
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-3 gap-2 text-xs mt-auto">
            <StatItem label="HP" value={stats(character, 'hp')} icon="❤️" />
            <StatItem
              label="ATK"
              value={stats(character, 'attackdamage')}
              icon="⚔️"
            />
            <StatItem label="DEF" value={stats(character, 'armor')} icon="🛡️" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Función auxiliar para obtener estadísticas de manera segura
const stats = (character, stat) => {
  return character?.stats?.[stat] || '-'
}

// Componente para mostrar un ítem de estadística
const StatItem = ({ label, value, icon }) => (
  <div className="flex flex-col items-center bg-base-200 rounded p-1 comic-border">
    <span className="font-semibold flex items-center gap-1 justify-center">
      <span className="text-xs">{icon}</span> <span>{label}</span>
    </span>
    <span className="font-mono">{value}</span>
  </div>
)

export default CharacterCard
