// components/CharacterHeader.jsx
const CharacterHeader = ({ character }) => (
  <div className="relative card">
    {/* Imagen del personaje como fondo con altura fija */}
    <div className="max-h-[calc(100vh-180px)] relative overflow-hidden">
      <CharacterImage character={character} />
    </div>

    {/* Información del personaje con nombre, título e historia */}
    <div className="absolute top-0 right-0 bottom-0 left-0 flex flex-col md:flex-row">
      {/* Gradiente oscuro en toda la imagen para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>

      {/* Contenedor para el texto */}
      <div className="relative z-10 p-6 flex flex-col justify-center w-full md:w-1/2 text-white">
        <h1 className="text-3xl font-bold">{character.name}</h1>
        {character.title && (
          <p className="text-xl italic mb-4">{character.title}</p>
        )}

        {/* Historia del personaje */}
        <div className="mt-4 overflow-y-auto pr-2 text-sm md:text-base">
          <h2 className="text-lg font-semibold mb-2">Historia</h2>
          <p className="leading-relaxed">{character.lore}</p>
        </div>
      </div>
    </div>
  </div>
)

// Subcomponente para la imagen
const CharacterImage = ({ character }) => (
  <div className="w-full h-full flex items-center justify-center bg-gray-800">
    {character.image ? (
      <div className="w-full h-full relative">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${character.id}_0.jpg`}
          alt={character.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/images/sinko-baro-ese.jpeg'
          }}
        />
      </div>
    ) : (
      <div className="text-center text-gray-400">Imagen no disponible</div>
    )}
  </div>
)

export default CharacterHeader
