import React, { useState } from 'react';

const FavoritesPage = () => {
  // Estado para las categorías personalizadas
  const [categories, setCategories] = useState([
    "Principales", 
    "Por probar", 
    "Mid season",
    "Ranked",
    "Para subir"
  ]);
  
  // Estado para la categoría activa
  const [activeCategory, setActiveCategory] = useState("Principales");
  
  // Estado para el modo de visualización
  const [viewMode, setViewMode] = useState("grid"); // "grid" o "list"
  
  // Estado para los campeones favoritos (simulado)
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Ahri",
      image: "/api/placeholder/120/120?text=Ahri",
      category: "Principales",
      notes: "Excelente para mid lane. Usar contra magos inmóviles.",
      stats: {
        damage: 85,
        mobility: 70,
        utility: 60,
        durability: 30,
        difficulty: 50
      },
      pendingBuild: false
    },
    {
      id: 2,
      name: "Malphite",
      image: "/api/placeholder/120/120?text=Malphite",
      category: "Principales",
      notes: "Tanque con buen engage. Usar contra equipos AD.",
      stats: {
        damage: 60,
        mobility: 40,
        utility: 65,
        durability: 90,
        difficulty: 20
      },
      pendingBuild: false
    },
    {
      id: 3,
      name: "Lux",
      image: "/api/placeholder/120/120?text=Lux",
      category: "Principales",
      notes: "Support con buen CC y daño. Cuidado con asesinos.",
      stats: {
        damage: 80,
        mobility: 20,
        utility: 75,
        durability: 25,
        difficulty: 40
      },
      pendingBuild: true
    },
    {
      id: 4,
      name: "Yasuo",
      image: "/api/placeholder/120/120?text=Yasuo",
      category: "Por probar",
      notes: "Pendiente de practicar mecánicas básicas.",
      stats: {
        damage: 90,
        mobility: 85,
        utility: 45,
        durability: 40,
        difficulty: 85
      },
      pendingBuild: true
    },
    {
      id: 5,
      name: "Leona",
      image: "/api/placeholder/120/120?text=Leona",
      category: "Ranked",
      notes: "Excelente initiation. Combo con ADC burst.",
      stats: {
        damage: 40,
        mobility: 30,
        utility: 85,
        durability: 85,
        difficulty: 35
      },
      pendingBuild: false
    }
  ]);
  
  // Filtrar favoritos por categoría
  const filteredFavorites = favorites.filter(fav => fav.category === activeCategory);
  
  // Función para gestionar la comparación
  const [championsToCompare, setChampionsToCompare] = useState([]);
  
  const toggleCompare = (champion) => {
    if (championsToCompare.some(c => c.id === champion.id)) {
      setChampionsToCompare(championsToCompare.filter(c => c.id !== champion.id));
    } else if (championsToCompare.length < 3) {
      setChampionsToCompare([...championsToCompare, champion]);
    }
  };
  
  // Estado para notas
  const [editingNote, setEditingNote] = useState(null);
  const [noteText, setNoteText] = useState('');
  
  const startEditingNote = (champion) => {
    setEditingNote(champion.id);
    setNoteText(champion.notes);
  };
  
  const saveNote = (championId) => {
    setFavorites(favorites.map(fav => 
      fav.id === championId ? {...fav, notes: noteText} : fav
    ));
    setEditingNote(null);
  };
  
  // Estado para modal de comparación
  const [showCompareModal, setShowCompareModal] = useState(false);
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl comic-title">Mis Campeones Favoritos</h1>
        
        <div className="flex gap-2">
          <button 
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline'} comic-border`}
            onClick={() => setViewMode('grid')}
          >
            🔲 Cuadrícula
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline'} comic-border`}
            onClick={() => setViewMode('list')}
          >
            📋 Lista
          </button>
        </div>
      </div>
      
      {/* Botón de comparar */}
      {championsToCompare.length > 0 && (
        <div className="comic-border p-4 bg-accent text-accent-content mb-6 flex justify-between items-center">
          <div>
            <span className="font-bold mr-2">Campeones seleccionados:</span>
            {championsToCompare.map(champ => champ.name).join(', ')}
          </div>
          <div className="flex gap-2">
            <button 
              className="btn btn-sm btn-primary comic-border"
              onClick={() => setShowCompareModal(true)}
              disabled={championsToCompare.length < 2}
            >
              COMPARAR ({championsToCompare.length}/3)
            </button>
            <button 
              className="btn btn-sm btn-error comic-border"
              onClick={() => setChampionsToCompare([])}
            >
              CANCELAR
            </button>
          </div>
        </div>
      )}
      
      {/* Categorías */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(category => (
          <button 
            key={category}
            className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline'} comic-border`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="btn btn-secondary comic-border">
          + NUEVA CATEGORÍA
        </button>
      </div>
      
      {/* Lista de favoritos */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredFavorites.map(champion => (
            <div key={champion.id} className="comic-border bg-base-100 p-4">
              <div className="flex gap-4">
                <div className="relative">
                  <div className="comic-border p-1">
                    <img src={champion.image} alt={champion.name} className="w-16 h-16" />
                  </div>
                  {champion.pendingBuild && (
                    <div className="absolute -top-2 -right-2 bg-warning text-warning-content text-xs p-1 comic-border rotate-12">
                      Pendiente
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-1">{champion.name}</h3>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    <div className="badge badge-primary">{champion.category}</div>
                    <button 
                      className={`badge ${championsToCompare.some(c => c.id === champion.id) ? 'badge-accent' : 'badge-outline'}`}
                      onClick={() => toggleCompare(champion)}
                    >
                      {championsToCompare.some(c => c.id === champion.id) ? '✓ Comparar' : '+ Comparar'}
                    </button>
                  </div>
                  
                  {editingNote === champion.id ? (
                    <div className="mt-2">
                      <textarea 
                        className="textarea comic-border w-full text-sm"
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        rows="3"
                      ></textarea>
                      <div className="flex justify-end gap-2 mt-1">
                        <button 
                          className="btn btn-xs btn-error"
                          onClick={() => setEditingNote(null)}
                        >
                          Cancelar
                        </button>
                        <button 
                          className="btn btn-xs btn-primary"
                          onClick={() => saveNote(champion.id)}
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-base-200 p-2 min-h-16 text-sm mt-2">
                      {champion.notes}
                      <button 
                        className="absolute top-1 right-1 text-xs bg-base-100 p-1 opacity-70 hover:opacity-100"
                        onClick={() => startEditingNote(champion)}
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4">
                <div className="grid grid-cols-5 gap-1">
                  {Object.entries(champion.stats).map(([stat, value]) => (
                    <div key={stat} className="text-center">
                      <div className="comic-border p-1 bg-base-200">
                        <div 
                          className="bg-primary h-16"
                          style={{ height: `${value}%` }}
                        ></div>
                      </div>
                      <div className="text-xs mt-1 capitalize">{stat}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <a href="#" className="btn btn-sm btn-primary comic-border flex-1">
                  DETALLES
                </a>
                <a href="#" className="btn btn-sm btn-secondary comic-border flex-1">
                  CREAR BUILD
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          {filteredFavorites.map(champion => (
            <div key={champion.id} className="comic-border bg-base-100 p-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="comic-border p-1">
                    <img src={champion.image} alt={champion.name} className="w-16 h-16" />
                  </div>
                  {champion.pendingBuild && (
                    <div className="absolute -top-2 -right-2 bg-warning text-warning-content text-xs p-1 comic-border rotate-12">
                      Pendiente
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold">{champion.name}</h3>
                    <div className="flex gap-2">
                      <button 
                        className={`badge ${championsToCompare.some(c => c.id === champion.id) ? 'badge-accent' : 'badge-outline'}`}
                        onClick={() => toggleCompare(champion)}
                      >
                        {championsToCompare.some(c => c.id === champion.id) ? '✓ Comparar' : '+ Comparar'}
                      </button>
                      <div className="badge badge-primary">{champion.category}</div>
                    </div>
                  </div>
                  
                  {editingNote === champion.id ? (
                    <div className="mt-2">
                      <textarea 
                        className="textarea comic-border w-full text-sm"
                        value={noteText}
                        onChange={e => setNoteText(e.target.value)}
                        rows="2"
                      ></textarea>
                      <div className="flex justify-end gap-2 mt-1">
                        <button 
                          className="btn btn-xs btn-error"
                          onClick={() => setEditingNote(null)}
                        >
                          Cancelar
                        </button>
                        <button 
                          className="btn btn-xs btn-primary"
                          onClick={() => saveNote(champion.id)}
                        >
                          Guardar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative bg-base-200 p-2 text-sm mt-2">
                      {champion.notes}
                      <button 
                        className="absolute top-1 right-1 text-xs bg-base-100 p-1 opacity-70 hover:opacity-100"
                        onClick={() => startEditingNote(champion)}
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2">
                  <a href="#" className="btn btn-sm btn-primary comic-border">
                    DETALLES
                  </a>
                  <a href="#" className="btn btn-sm btn-secondary comic-border">
                    CREAR BUILD
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Acciones */}
      <div className="flex justify-center gap-4">
        <button className="btn btn-primary comic-border">
          IMPORTAR FAVORITOS
        </button>
        <button className="btn btn-secondary comic-border">
          GESTIONAR CATEGORÍAS
        </button>
      </div>
      
      {/* Modal de comparación (simplificado) */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="comic-border bg-base-100 p-6 max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl comic-title">Comparativa de Campeones</h2>
              <button 
                className="btn btn-sm btn-circle btn-error"
                onClick={() => setShowCompareModal(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {/* Columna de estadísticas */}
              <div>
                <div className="h-24 mb-4"></div> {/* Espacio para encabezados */}
                {Object.keys(championsToCompare[0]?.stats || {}).map(stat => (
                  <div key={stat} className="py-2 font-bold capitalize">{stat}</div>
                ))}
              </div>
              
              {/* Columnas de campeones */}
              {championsToCompare.map(champion => (
                <div key={champion.id}>
                  <div className="text-center mb-4">
                    <div className="comic-border p-1 inline-block mb-2">
                      <img src={champion.image} alt={champion.name} className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold">{champion.name}</h3>
                  </div>
                  
                  {Object.entries(champion.stats).map(([stat, value]) => {
                    // Encontrar el valor máximo para esta estadística
                    const maxValue = Math.max(...championsToCompare.map(c => c.stats[stat]));
                    const isMax = value === maxValue;
                    
                    return (
                      <div key={stat} className="py-2">
                        <div className="relative h-6 bg-base-200 comic-border">
                          <div
                            className={`absolute left-0 top-0 h-full ${isMax ? 'bg-accent' : 'bg-primary'}`}
                            style={{ width: `${value}%` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                            {value}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            
            {/* Sección de notas */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Notas de Campeones</h3>
              <div className="grid grid-cols-3 gap-4">
                {championsToCompare.map(champion => (
                  <div key={champion.id} className="comic-border bg-base-200 p-4">
                    <h4 className="font-bold mb-2">{champion.name}</h4>
                    <p className="text-sm">{champion.notes}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Resumen comparativo */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Resumen Comparativo</h3>
              <div className="grid grid-cols-3 gap-4">
                {championsToCompare.map(champion => {
                  // Calcular la estadística más alta y más baja de este campeón
                  const stats = Object.entries(champion.stats);
                  const highestStat = stats.reduce((a, b) => a[1] > b[1] ? a : b);
                  const lowestStat = stats.reduce((a, b) => a[1] < b[1] ? a : b);
                  
                  return (
                    <div key={champion.id} className="comic-border bg-base-200 p-4">
                      <h4 className="font-bold mb-2">{champion.name}</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-bold">Punto fuerte:</span> {highestStat[0]} ({highestStat[1]})
                        </div>
                        <div>
                          <span className="font-bold">Punto débil:</span> {lowestStat[0]} ({lowestStat[1]})
                        </div>
                        <div>
                          <span className="font-bold">Categoría:</span> {champion.category}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                className="btn btn-primary comic-border"
                onClick={() => setShowCompareModal(false)}
              >
                CERRAR COMPARACIÓN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;