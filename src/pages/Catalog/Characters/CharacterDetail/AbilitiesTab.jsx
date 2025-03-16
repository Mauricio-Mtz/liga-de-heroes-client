// components/AbilitiesTab.jsx
import { useEffect, useState } from 'react'

const AbilitiesTab = ({ character }) => {
  if (!character || !character.spells) {
    return (
      <div className="text-center text-error py-8">
        No se encontraron habilidades
      </div>
    )
  }

  const abilities = [
    {
      id: 'passive',
      name: character.passive.name,
      description: character.passive.description,
      image: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/passive/${character.passive.image.full}`,
      type: 'Pasiva',
    },
    ...character.spells.map((spell, index) => ({
      id: spell.id,
      name: spell.name,
      description: spell.description,
      tooltip: spell.tooltip,
      cooldown: spell.cooldownBurn,
      cost: spell.costBurn,
      range: spell.rangeBurn,
      image: `https://ddragon.leagueoflegends.com/cdn/14.22.1/img/spell/${spell.image.full}`,
      type: ['Q', 'W', 'E', 'R'][index],
    })),
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Habilidades</h2>
      <AbilityCard abilities={abilities} />
    </div>
  )
}

const cleanHtmlText = (text) => {
  if (!text) return ''

  let cleanText = text
    .replace(
      /<font color='#FF9900'>(.*?)<\/font>/g,
      '<span class="text-amber-500 font-bold">$1</span>'
    )
    .replace(
      /<font color='#cccc00'>(.*?)<\/font>/g,
      '<span class="text-yellow-500 font-bold">$1</span>'
    )
    .replace(
      /<font color='#[0-9a-fA-F]+'>(.*?)<\/font>/g,
      '<span class="font-medium">$1</span>'
    )
    .replace(/<br>/g, '\n')
    .replace(/<br\/>/g, '\n')
    .replace(/<br \/>/g, '\n')

  return cleanText
}

const AbilityCard = ({ abilities }) => {
  const [formattedPassiveDescription, setFormattedPassiveDescription] =
    useState('')

  useEffect(() => {
    setFormattedPassiveDescription(cleanHtmlText(abilities[0].description))
  }, [abilities])

  return (
    <div>
      {/* Habilidad Pasiva en la parte superior */}
      <div className="w-full flex flex-col items-center mb-4">
        {abilities[0].image && (
          <div className="w-16 h-16 rounded-full overflow-hidden bg-base-300 mb-2">
            <img
              src={abilities[0].image}
              alt={abilities[0].name}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <span className="badge badge-primary mb-1">{abilities[0].type}</span>
        <h3 className="font-bold text-center">{abilities[0].name}</h3>
        <p
          className="text-sm text-center px-4"
          dangerouslySetInnerHTML={{ __html: formattedPassiveDescription }}
        />
      </div>
      {/* Habilidades QWER en una cuadrícula de 2x2 */}
      <div className="grid grid-cols-2 gap-4">
        {abilities.slice(1).map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-2 bg-base-300 rounded-lg shadow"
          >
            {skill.image && (
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2">
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <h4 className="text-sm font-semibold text-center">{skill.name}</h4>
            <p className="text-xs text-center px-2">{skill.description}</p>
            {skill.cooldown && (
              <span className="text-xs text-info">CD: {skill.cooldown}s</span>
            )}
            {skill.cost && skill.cost !== '0' && (
              <span className="text-xs text-secondary">
                Costo: {skill.cost}
              </span>
            )}
            {skill.range && skill.range !== '25000' && (
              <span className="text-xs text-accent">Rango: {skill.range}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AbilitiesTab
