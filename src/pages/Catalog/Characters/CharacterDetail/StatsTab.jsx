// components/StatsTab.jsx
const StatsTab = ({ stats }) => {
  // Diccionario de traducciones para las estadísticas
  const traducciones = {
    hp: 'Vida',
    hpperlevel: 'Vida por nivel',
    mp: 'Maná',
    mpperlevel: 'Maná por nivel',
    movespeed: 'Velocidad de movimiento',
    armor: 'Armadura',
    armorperlevel: 'Armadura por nivel',
    spellblock: 'Resistencia mágica',
    spellblockperlevel: 'Resistencia mágica por nivel',
    attackrange: 'Rango de ataque',
    hpregen: 'Regeneración de vida',
    hpregenperlevel: 'Regeneración de vida por nivel',
    mpregen: 'Regeneración de maná',
    mpregenperlevel: 'Regeneración de maná por nivel',
    crit: 'Crítico',
    critperlevel: 'Crítico por nivel',
    attackdamage: 'Daño de ataque',
    attackdamageperlevel: 'Daño de ataque por nivel',
    attackspeedperlevel: 'Velocidad de ataque por nivel',
    attackspeed: 'Velocidad de ataque',
  }

  // Agrupar estadísticas por categorías
  const statCategories = {
    'Estadísticas Base': [
      'hp',
      'mp',
      'armor',
      'spellblock',
      'movespeed',
      'attackrange',
      'attackdamage',
      'attackspeed',
    ],
    Regeneración: ['hpregen', 'mpregen'],
    'Estadísticas por Nivel': [
      'hpperlevel',
      'mpperlevel',
      'armorperlevel',
      'spellblockperlevel',
      'hpregenperlevel',
      'mpregenperlevel',
      'attackdamageperlevel',
      'attackspeedperlevel',
    ],
  }

  return (
    <div className="space-y-8">
      {Object.entries(statCategories).map(([category, statKeys]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {statKeys.map((stat) => {
              if (stats[stat] !== undefined) {
                return (
                  <StatItem
                    key={stat}
                    stat={traducciones[stat] || stat}
                    value={stats[stat]}
                  />
                )
              }
              return null
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Subcomponente para cada estadística (ahora sin la barra de progreso)
const StatItem = ({ stat, value }) => (
  <div className="flex justify-between items-center bg-base-200 p-2 rounded-lg">
    <span className="font-medium">{stat}</span>
    <span className="text-lg font-bold">
      {typeof value === 'number' ? value.toFixed(1) : value}
    </span>
  </div>
)

export default StatsTab
