// src/pages/Builds/components/ItemComponents.jsx
import React, { memo } from 'react';
import { formatTagName } from '../../../utils/itemFormatters';

// Componente para mostrar la imagen del ítem con lazy loading
export const ItemImage = memo(({ item, imageError, setImageError }) => {
  // URL base para las imágenes (ajusta según corresponda a tu aplicación)
  const baseImageUrl = 'https://ddragon.leagueoflegends.com/cdn/14.22.1/img/item/';
  
  return (
    <div className="relative flex justify-center">
      <div className="w-12 h-12 sm:w-14 sm:h-14 relative overflow-hidden rounded-md bg-base-100 shadow-sm border border-base-300">
        {!imageError && item.id ? (
          <img
            src={`${baseImageUrl}${item.id}.png`}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy" // Cargar imagen solo cuando sea visible
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-base-300 text-base-content font-bold text-lg">
            {item.name.charAt(0)}
          </div>
        )}
      </div>
      
      {/* Efecto de brillo en la esquina */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-white opacity-40 rounded-full transform -translate-x-1 translate-y-1"></div>
    </div>
  );
});

// Componente para mostrar un tag como insignia
export const TagBadge = memo(({ tag, index }) => {
  // Colores alternados para las insignias
  const colors = ['badge-primary', 'badge-secondary', 'badge-accent', 'badge-info', 'badge-success'];
  const colorClass = colors[index % colors.length];
  
  return (
    <span 
      className={`badge ${colorClass} badge-xs sm:badge-sm text-xs text-white border-none`}
    >
      {formatTagName(tag)}
    </span>
  );
});

// Componente para mostrar una estadística
export const StatItem = memo(({ label, value, icon, index }) => {
  const isPositive = value > 0;
  
  return (
    <div 
      className={`flex items-center justify-between p-1 rounded text-xs ${
        isPositive ? 'bg-success/10' : 'bg-error/10'
      }`}
    >
      <span className="flex items-center gap-1 truncate">
        <span>{icon}</span>
        <span className="font-medium truncate">{label}</span>
      </span>
      <span className={`font-bold ${isPositive ? 'text-success' : 'text-error'}`}>
        {isPositive ? '+' : ''}{typeof value === 'number' && value < 1 && value > 0 ? (value * 100).toFixed(0) + '%' : value}
      </span>
    </div>
  );
});

// Componente para mostrar el precio con formato
export const PriceTag = memo(({ price }) => {
  return (
    <div className="flex items-center gap-1 text-xs font-medium">
      <span className="text-yellow-500">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </span>
      <span>{price}</span>
    </div>
  );
});

// Asignar displayName para facilitar la depuración
ItemImage.displayName = 'ItemImage';
TagBadge.displayName = 'TagBadge';
StatItem.displayName = 'StatItem';
PriceTag.displayName = 'PriceTag';