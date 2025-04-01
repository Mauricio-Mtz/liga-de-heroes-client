// src/pages/Builds/components/ItemsList.jsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { itemsService } from '../../../services/itemsService';
import ItemCard from './ItemCard';

const ITEMS_PER_PAGE = 12; // Número de ítems a cargar inicialmente y por cada scroll

const ItemsList = ({ equippedItems, onAddItem }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  
  const observerTarget = useRef(null);
  const listContainerRef = useRef(null);
  
  // Cargar items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const itemsData = await itemsService.getAllItems();
        setItems(itemsData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchItems();
  }, []);
  
  // Asegurarse de extraer correctamente los tipos desde las propiedades del ítem
  const getItemType = (item) => {
    // Verificar si tiene propiedad type
    if (item.type && typeof item.type === 'string') {
      return item.type;
    }
    
    // Si tiene tags, usar el primer tag como tipo
    if (item.tags && Array.isArray(item.tags) && item.tags.length > 0) {
      return item.tags[0];
    }
    
    // Si tiene una categoría, usarla como tipo
    if (item.category) {
      return item.category;
    }
    
    return 'Sin tipo';
  };
  
  // Obtener todos los tipos únicos para el filtro
  const extractUniqueTypes = () => {
    const types = items.map(item => getItemType(item)).filter(Boolean);
    return [...new Set(types)].sort();
  };
  
  const uniqueTypes = extractUniqueTypes();
  
  // Filtrar items según búsqueda y tipo
  const filteredItems = items.filter(item => {
    // Filtro por búsqueda de texto
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filtro por tipo
    const itemType = getItemType(item);
    const matchesType = !filterType || itemType === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Obtener solo los ítems que deben mostrarse (paginación virtual)
  const itemsToShow = filteredItems.slice(0, visibleItems);
  
  // Verificar si un item ya está equipado
  const isItemEquipped = (itemId) => {
    return equippedItems.some(item => item.id === itemId);
  };
  
  // Resetear la paginación cuando cambian los filtros
  useEffect(() => {
    setVisibleItems(ITEMS_PER_PAGE);
    // Scroll al inicio cuando se filtran los resultados
    if (listContainerRef.current) {
      listContainerRef.current.scrollTop = 0;
    }
  }, [searchQuery, filterType]);
  
  // Configurar el observador de intersección para cargar más elementos al hacer scroll
  const loadMoreItems = useCallback(() => {
    if (visibleItems < filteredItems.length) {
      // Añadir más ítems con un pequeño retraso para no bloquear el UI
      setTimeout(() => {
        setVisibleItems(prev => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length));
      }, 10);
    }
  }, [visibleItems, filteredItems.length]);
  
  // Configurar IntersectionObserver para detectar cuando el usuario llega al final
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
    
    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMoreItems]);
  
  // Manejador para el evento de scroll como respaldo para navegadores que no soporten IntersectionObserver
  const handleScroll = useCallback(() => {
    if (!listContainerRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = listContainerRef.current;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    
    // Cargar más elementos cuando estemos a 300px del final
    if (scrollBottom < 300) {
      loadMoreItems();
    }
  }, [loadMoreItems]);
  
  // Añadir evento de scroll como respaldo
  useEffect(() => {
    const currentContainer = listContainerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);
  
  return (
    <div className="w-full mx-auto max-w-7xl h-full">
      <h2 className="card-title text-2xl mb-4 comic-text">Biblioteca de Items</h2>
      
      {/* Filtros - Responsivos y mejor organizados */}
      <div className="bg-base-200 p-4 rounded-lg mb-6 shadow-md">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Buscador */}
          <div className="form-control flex-1">
            <label className="label">
              <span className="label-text font-medium">Buscar por nombre o descripción</span>
            </label>
            <div className="relative flex w-full">
              <input 
                type="text" 
                placeholder="Buscar items..." 
                className="input input-bordered w-full pr-12" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-square absolute right-0 rounded-l-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Filtro de tipo */}
          <div className="form-control md:w-1/3">
            <label className="label">
              <span className="label-text font-medium">Filtrar por tipo</span>
            </label>
            <select 
              className="select select-bordered w-full" 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">Todos los tipos</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Contador de resultados */}
        <div className="mt-4 text-sm">
          <span className="font-medium">
            {filteredItems.length} {filteredItems.length === 1 ? 'ítem encontrado' : 'ítems encontrados'}
            {visibleItems < filteredItems.length && 
             ` (mostrando ${visibleItems})`}
          </span>
          {(searchQuery || filterType) && (
            <button 
              className="btn btn-xs btn-ghost ml-2"
              onClick={() => {
                setSearchQuery('');
                setFilterType('');
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>
      
      {/* Lista de items - Con virtualización */}
      <div 
        ref={listContainerRef}
        className="overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: 'calc(100vh - 240px)', paddingRight: '8px' }}
      >
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="loading loading-spinner loading-lg"></div>
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-gray-500 mt-4">No se encontraron items que coincidan con la búsqueda</p>
            <button 
              className="btn btn-sm btn-primary mt-4"
              onClick={() => {
                setSearchQuery('');
                setFilterType('');
              }}
            >
              Mostrar todos
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {itemsToShow.map((item) => (
                <ItemCard 
                  key={item.id} 
                  item={item} 
                  isEquipped={isItemEquipped(item.id)} 
                  onAddItem={onAddItem} 
                />
              ))}
            </div>
            
            {/* Elemento observador para cargar más ítems */}
            {visibleItems < filteredItems.length && (
              <div 
                ref={observerTarget} 
                className="py-4 flex justify-center"
              >
                <div className="loading loading-dots loading-md"></div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ItemsList;