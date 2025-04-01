const StatsTab = ({ item }) => {
  const statTranslations = {
    FlatPhysicalDamageMod: 'Daño Físico',
    FlatMagicDamageMod: 'Daño Mágico',
    FlatArmorMod: 'Armadura',
    FlatSpellBlockMod: 'Resistencia Mágica',
    FlatCritChanceMod: 'Probabilidad de Crítico',
    FlatHPPoolMod: 'Vida',
    FlatMPPoolMod: 'Maná',
    PercentLifeStealMod: 'Robo de Vida',
    PercentMovementSpeedMod: 'Velocidad de Movimiento'
  }

  const stats = Object.entries(item.stats || {})
    .filter(([key, value]) => value !== 0)
    .map(([key, value]) => ({
      name: statTranslations[key] || key,
      value: value
    }))

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Estadísticas del Item</h2>
      
      {stats.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-base-200 p-3 rounded-lg flex justify-between items-center"
            >
              <span>{stat.name}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay estadísticas adicionales</p>
      )}
    </div>
  )
}

export default StatsTab