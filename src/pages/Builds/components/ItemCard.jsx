// src/pages/Builds/components/ItemCard.jsx
import { useState, memo } from 'react';
import { cleanDescription } from '../../../utils/itemFormatters';
import { ItemImage, TagBadge } from './ItemComponents';

// Componente optimizado con memo para evitar re-renderizados innecesarios
const ItemCard = memo(({ item, isEquipped, onAddItem }) => {
  const [imageError, setImageError] = useState(false);
  
  // Función para obtener el precio del ítem
  const getItemPrice = () => {
    if (!item.gold) return 'N/A';
    return `${item.gold.total || 0}`;
  };
  
  // Obtener descripción limpia - Solo calcular una vez
  const description = item.description ? 
    cleanDescription(item.description, 'No hay descripción disponible.') : 
    'No hay descripción disponible.';
  
  // Obtener tags del ítem - Solo calcular una vez
  const getTags = () => {
    if (item.tags && item.tags.length > 0) {
      return item.tags;
    }
    if (item.type) {
      return [item.type];
    }
    return [];
  };
  
  const tags = getTags();
  
  // Función para manejar el clic del botón de equipar
  const handleEquip = () => {
    if (!isEquipped) {
      onAddItem(item);
    }
  };
  
  return (
    <div
      className="card bg-base-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full border border-base-300"
      style={{ transform: 'rotate(-0.5deg)' }}
    >
      {/* Header de la tarjeta con nombre */}
      <div
        className="card-title p-2 sm:p-3 bg-base-300 border-b border-base-content/20 flex justify-between items-center"
        style={{ minHeight: '50px' }}
      >
        <h3 className="text-sm sm:text-lg font-bold truncate comic-text">
          {item.name}
        </h3>
        {item.gold && (
          <div
            className="badge badge-sm sm:badge-md bg-primary text-white border border-primary-content/30"
            style={{ transform: 'rotate(1deg)' }}
          >
            {getItemPrice()}
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col h-full">
        <div className="flex flex-row gap-3 items-start mb-3">
          {/* Contenedor de imagen con efecto */}
          <div className="flex-shrink-0">
            <ItemImage 
              item={item} 
              imageError={imageError} 
              setImageError={setImageError} 
            />
          </div>
          
          {/* Información rápida */}
          <div className="flex-grow min-w-0">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map((tag, index) => (
                  <TagBadge key={index} tag={tag} index={index} />
                ))}
              </div>
            )}
            
            {/* Breve descripción */}
            {description && (
              <div 
                className="text-xs text-gray-600 line-clamp-3" 
                title={description}
              >
                {description}
              </div>
            )}
          </div>
        </div>
        
        {/* Espacio de crecimiento para mantener el botón abajo */}
        <div className="flex-grow"></div>
        
        {/* Botón de acción */}
        <div className="card-actions justify-end mt-2">
          <button 
            className={`btn btn-xs sm:btn-sm ${isEquipped ? 'btn-disabled bg-base-300' : 'btn-primary'} shadow-sm hover:shadow transition-all`}
            onClick={handleEquip}
            disabled={isEquipped}
          >
            {isEquipped ? 'Equipado' : 'Equipar'}
          </button>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Función de comparación personalizada para memo
  // Solo re-renderiza si cambian estas propiedades
  return (
    prevProps.item.id === nextProps.item.id &&
    prevProps.isEquipped === nextProps.isEquipped
  );
});

// Asignar un displayName para facilitar la depuración
ItemCard.displayName = 'ItemCard';

export default ItemCard;