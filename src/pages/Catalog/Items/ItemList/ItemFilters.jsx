// ItemFilters.jsx - Componente mejorado para los filtros de items
const ItemFilters = ({
  filter,
  setFilter,
  selectedTag,
  setSelectedTag,
  allTags,
}) => {
  // Formatear nombres de categorías
  const formatTagName = (tag) => {
    const tagNames = {
      Health: 'Vida',
      Mana: 'Maná',
      ManaRegen: 'Regeneración de Maná',
      Armor: 'Armadura',
      SpellBlock: 'Resistencia Mágica',
      HealthRegen: 'Regeneración de Vida',
      Damage: 'Daño',
      CriticalStrike: 'Golpe Crítico',
      AttackSpeed: 'Velocidad de Ataque',
      LifeSteal: 'Robo de Vida',
      SpellDamage: 'Poder de Habilidad',
      CooldownReduction: 'Reducción de Enfriamiento',
      SpellVamp: 'Vampirismo de Hechizos',
      MagicPenetration: 'Penetración Mágica',
      ArmorPenetration: 'Penetración de Armadura',
      AbilityHaste: 'Celeridad de Habilidades',
      GoldPer: 'Oro por Segundo',
      Slow: 'Ralentización',
      Boots: 'Botas',
      Jungle: 'Jungla',
      Lane: 'Carril',
      Stealth: 'Sigilo',
      Vision: 'Visión',
      Consumable: 'Consumible',
      Active: 'Activo',
      Tenacity: 'Tenacidad',
      Aura: 'Aura',
      NonbootsMovement: 'Movimiento',
      Trinket: 'Trinket',
      OnHit: 'Al Golpear',
      SpellCast: 'Lanzar Hechizo',
    }

    return tagNames[tag] || tag
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe para buscar..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full comic-border input"
          />
          {filter && (
            <button
              onClick={() => setFilter('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content hover:text-primary font-bold text-xl"
              title="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Filtro de tags */}
      <div className="md:w-1/3">
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="w-full comic-border select"
        >
          <option value="">Todas las categorías</option>
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {formatTagName(tag)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ItemFilters
