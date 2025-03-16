// utils/itemFormatters.js

// Función para limpiar el HTML/XML de las descripciones
export const cleanDescription = (desc, plaintext) => {
  if (!desc) return plaintext || 'No hay descripción disponible.'

  // Eliminar todas las etiquetas XML/HTML manteniendo su contenido
  let cleaned = desc
    .replace(/<mainText>/g, '')
    .replace(/<\/mainText>/g, '')
    .replace(/<br><br>/g, ' ')
    .replace(/<br>/g, ' ')
    .replace(/<br\/>/g, ' ')
    .replace(/<\/br>/g, ' ')

  // Reemplazar <stats> con un formato especial
  cleaned = cleaned.replace(/<stats>(.*?)<\/stats>/g, '$1 ')

  // Reemplazar <attention> con un formato especial
  cleaned = cleaned.replace(/<attention>(.*?)<\/attention>/g, '$1')

  // Eliminar otras etiquetas comunes en la descripción
  cleaned = cleaned
    .replace(/<passive>/g, '')
    .replace(/<\/passive>/g, '')
    .replace(/<active>/g, '')
    .replace(/<\/active>/g, '')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, ' ')
    .replace(/<rules>/g, '')
    .replace(/<\/rules>/g, '')
    .replace(/<status>(.*?)<\/status>/g, '$1')
    .replace(/<magicDamage>(.*?)<\/magicDamage>/g, '$1')
    .replace(/<physicalDamage>(.*?)<\/physicalDamage>/g, '$1')
    .replace(/<trueDamage>(.*?)<\/trueDamage>/g, '$1')
    .replace(/<scaleMana>(.*?)<\/scaleMana>/g, '$1')
    .replace(/<healing>(.*?)<\/healing>/g, '$1')
    .replace(/<scaleAD>(.*?)<\/scaleAD>/g, '$1')
    .replace(/<scaleAP>(.*?)<\/scaleAP>/g, '$1')
    .replace(/<shield>(.*?)<\/shield>/g, '$1')
    .replace(/<effectAmount>(.*?)<\/effectAmount>/g, '$1')
    .replace(/<speed>(.*?)<\/speed>/g, '$1')
    .replace(/<onHit>(.*?)<\/onHit>/g, '$1')
    .replace(/<rarityMythic>(.*?)<\/rarityMythic>/g, '$1')
    .replace(/<rarityLegendary>(.*?)<\/rarityLegendary>/g, '$1')
    .replace(/<unique>(.*?)<\/unique>/g, '$1')
    .replace(/<spellName>(.*?)<\/spellName>/g, '$1')
    .replace(/<keywordMajor>(.*?)<\/keywordMajor>/g, '$1')
    .replace(/<keywordStealth>(.*?)<\/keywordStealth>/g, '$1')
    .replace(/<flavorText>(.*?)<\/flavorText>/g, '$1')
    .replace(/<ornnBonus>(.*?)<\/ornnBonus>/g, '$1')
    .replace(/<consumable>(.*?)<\/consumable>/g, '$1')
    .replace(/<immobilize>(.*?)<\/immobilize>/g, '$1')
    .replace(/<slow>(.*?)<\/slow>/g, '$1')
    .replace(/<attackDamage>(.*?)<\/attackDamage>/g, '$1')
    .replace(/<abilityPower>(.*?)<\/abilityPower>/g, '$1')
    .replace(/<armor>(.*?)<\/armor>/g, '$1')
    .replace(/<magicResist>(.*?)<\/magicResist>/g, '$1')
    .replace(/<lifeSteal>(.*?)<\/lifeSteal>/g, '$1')

  // Estrategia más robusta: eliminar cualquier etiqueta XML/HTML restante
  cleaned = cleaned.replace(/<\/?[^>]+(>|$)/g, '')

  return cleaned || plaintext || 'No hay descripción disponible.'
}

// Función para formatear los nombres de estadísticas
export const formatStatName = (statKey) => {
  const statNames = {
    FlatHPPoolMod: 'Vida',
    FlatMPPoolMod: 'Maná',
    PercentAttackSpeedMod: 'Vel. Ataque',
    FlatMovementSpeedMod: 'Velocidad',
    FlatArmorMod: 'Armadura',
    FlatSpellBlockMod: 'Res. Mágica',
    FlatPhysicalDamageMod: 'Daño AD',
    FlatMagicDamageMod: 'Poder AP',
    FlatCritChanceMod: 'Crítico',
    PercentLifeStealMod: 'Robo de Vida',
    PercentMagicPenetrationMod: 'Pen. Mágica',
    FlatMagicPenetrationMod: 'Pen. Mágica',
    PercentArmorPenetrationMod: 'Pen. Armadura',
    FlatArmorPenetrationMod: 'Pen. Armadura',
    PercentBonusArmorPenetrationMod: 'Pen. Armadura',
    PercentCritChanceMod: 'Prob. Crítico',
    PercentCritDamageMod: 'Daño Crítico',
    FlatHPRegenMod: 'Regen. Vida',
    PercentHPRegenMod: 'Regen. Vida',
    FlatMPRegenMod: 'Regen. Maná',
    PercentMPRegenMod: 'Regen. Maná',
    FlatDodgeMod: 'Esquiva',
    PercentDodgeMod: 'Esquiva',
    FlatEnergyRegenMod: 'Regen. Energía',
    FlatEnergyPoolMod: 'Energía',
    PercentSpellVampMod: 'Vampirismo Hechizo',
    FlatTimeDeadMod: 'Tiempo Muerto',
    PercentTimeDeadMod: 'Tiempo Muerto',
    FlatBlockMod: 'Bloqueo',
    PercentBlockMod: 'Bloqueo',
    FlatEXPBonus: 'Bonus EXP',
    PercentEXPBonus: 'Bonus EXP',
    FlatGoldPer10Mod: 'Oro/10s',
  }

  return statNames[statKey] || formatKeyToName(statKey)
}

// Función auxiliar para formatear claves no reconocidas
export const formatKeyToName = (key) => {
  return key
    .replace(/Flat|Percent|Mod/g, '')
    .replace(/([A-Z])/g, ' $1')
    .trim()
}

// Función para formatear nombres de tags
export const formatTagName = (tag) => {
  const tagNames = {
    Health: 'Vida',
    Mana: 'Maná',
    ManaRegen: 'Regen Maná',
    Armor: 'Armadura',
    SpellBlock: 'Res. Mágica',
    HealthRegen: 'Regen Vida',
    Damage: 'Daño',
    CriticalStrike: 'Crítico',
    AttackSpeed: 'Vel. Ataque',
    LifeSteal: 'Robo Vida',
    SpellDamage: 'Poder AP',
    CooldownReduction: 'Reducción CD',
    SpellVamp: 'Vampirismo',
    MagicPenetration: 'Pen. Mágica',
    ArmorPenetration: 'Pen. Armadura',
    AbilityHaste: 'Celeridad',
    GoldPer: 'Oro',
    Slow: 'Ralentizar',
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

// Función para obtener icono según tipo de estadística
export const getStatIcon = (statKey) => {
  const statIcons = {
    FlatHPPoolMod: '❤️',
    FlatMPPoolMod: '🔷',
    PercentAttackSpeedMod: '⚡',
    FlatMovementSpeedMod: '👟',
    FlatArmorMod: '🛡️',
    FlatSpellBlockMod: '🔮',
    FlatPhysicalDamageMod: '⚔️',
    FlatMagicDamageMod: '🔥',
    FlatCritChanceMod: '🎯',
    // Añadir más según sea necesario
  }

  return statIcons[statKey] || '✨'
}

// Formatear valor de estadística
export const formatStatValue = (value) => {
  if (typeof value !== 'number') return value

  // Si es un valor porcentual (entre 0 y 1)
  if (value > 0 && value < 1) {
    return `+${(value * 100).toFixed()}%`
  }

  // Para otros valores numéricos
  return value > 0
    ? value % 1 === 0
      ? '+' + value
      : '+' + value.toFixed(1)
    : value
}
