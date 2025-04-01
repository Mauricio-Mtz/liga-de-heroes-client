// src/pages/Builds/components/StatsPanel.jsx
import { useState, useEffect } from 'react';

const StatsPanel = ({ stats, items, level, onUpdateStat }) => {
  const [baseStats, setBaseStats] = useState({});
  const [itemModifiers, setItemModifiers] = useState({});
  const [customStats, setCustomStats] = useState({});
  
  // Calcular estadísticas totales
  useEffect(() => {
    // Base de estadísticas según el nivel (ejemplo)
    const calculateBaseStats = () => {
      // Este es un cálculo de ejemplo, ajústalo según tu lógica de juego
      return {
        hp: 100 + (level * 10),
        attack: 10 + (level * 2),
        defense: 5 + (level * 1.5),
        speed: 5 + (level * 0.5),
        magic: 5 + (level * 1.8),
        resistance: 5 + (level * 1)
      };
    };
    
    setBaseStats(calculateBaseStats());
    
    // Calcular modificadores de items
    const itemStats = {};
    items.forEach(item => {
      if (item.stats) {
        Object.entries(item.stats).forEach(([stat, value]) => {
          itemStats[stat] = (itemStats[stat] || 0) + value;
        });
      }
    });
    setItemModifiers(itemStats);
    
    // Inicializar estadísticas personalizadas si no existen
    if (stats) {
      setCustomStats(stats);
    }
  }, [level, items, stats]);
  
  // Calcular el total de una estadística
  const calculateTotal = (stat) => {
    const base = baseStats[stat] || 0;
    const itemMod = itemModifiers[stat] || 0;
    const custom = customStats[stat] || 0;
    
    return base + itemMod + custom;
  };
  
  // Manejar cambio en estadística personalizada
  const handleCustomStatChange = (stat, value) => {
    const newValue = parseInt(value) || 0;
    const newCustomStats = { ...customStats, [stat]: newValue };
    setCustomStats(newCustomStats);
    onUpdateStat(stat, newValue);
  };
  
  // Lista de estadísticas principales
  const mainStats = [
    { id: 'hp', name: 'Puntos de Vida', icon: '❤️', max: 1000 },
    { id: 'attack', name: 'Ataque', icon: '⚔️', max: 200 },
    { id: 'defense', name: 'Defensa', icon: '🛡️', max: 200 },
    { id: 'speed', name: 'Velocidad', icon: '💨', max: 100 },
    { id: 'magic', name: 'Magia', icon: '✨', max: 200 },
    { id: 'resistance', name: 'Resistencia', icon: '🔮', max: 200 }
  ];
  
  // Obtener todas las estadísticas (incluidas las de los items)
  const getAllStats = () => {
    const allStats = [...mainStats];
    
    // Añadir estadísticas de items que no estén en la lista principal
    const itemStats = Object.keys(itemModifiers);
    itemStats.forEach(stat => {
      if (!allStats.some(s => s.id === stat)) {
        allStats.push({
          id: stat,
          name: stat.charAt(0).toUpperCase() + stat.slice(1), // Capitalizar
          icon: '📊',
          max: 100
        });
      }
    });
    
    return allStats;
  };
  
  return (
    <div>
      <h2 className="card-title text-2xl mb-4">Estadísticas del Personaje</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {getAllStats().map(stat => {
          const totalValue = calculateTotal(stat.id);
          const percentage = Math.min(100, (totalValue / stat.max) * 100);
          
          return (
            <div key={stat.id} className="card bg-base-200 comic-border">
              <div className="card-body p-4">
                <h3 className="card-title text-lg flex items-center gap-2">
                  <span>{stat.icon}</span>
                  <span>{stat.name}</span>
                </h3>
                
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Base: {baseStats[stat.id] || 0}</span>
                    <span className="text-sm">Items: {itemModifiers[stat.id] || 0}</span>
                    <span className="text-sm">Custom: {customStats[stat.id] || 0}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700 comic-border">
                        <div 
                          className="bg-primary h-4 rounded-full transition-all" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="font-bold text-lg">{totalValue}</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <label className="label">
                    <span className="label-text">Ajuste personalizado</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      className="range range-primary" 
                      min="-50" 
                      max="50" 
                      value={customStats[stat.id] || 0}
                      onChange={(e) => handleCustomStatChange(stat.id, e.target.value)}
                    />
                    <input 
                      type="number" 
                      className="input input-bordered w-20" 
                      value={customStats[stat.id] || 0}
                      onChange={(e) => handleCustomStatChange(stat.id, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsPanel;