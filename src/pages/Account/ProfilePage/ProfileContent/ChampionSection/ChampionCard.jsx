// components/ChampionCard.jsx
const ChampionCard = ({ champion, index }) => {
  return (
    <div className="comic-border p-2 text-center">
      <div className="relative comic-border p-1 mb-2">
        <img
          src={`/api/placeholder/120/120?text=${champion}`}
          alt={champion}
          className="w-full h-auto"
        />
        <div className="absolute top-0 right-0 bg-accent text-white w-6 h-6 flex items-center justify-center comic-border">
          {index + 1}
        </div>
      </div>
      <div className="font-bold">{champion}</div>
      <div className="text-xs opacity-70">Maestría 7</div>
    </div>
  )
}

export default ChampionCard
