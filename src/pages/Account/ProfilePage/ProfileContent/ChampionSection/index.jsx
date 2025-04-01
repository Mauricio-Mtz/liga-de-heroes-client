import ChampionCard from './ChampionCard';

const ChampionsSection = ({ champions }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl comic-title">Campeones Favoritos</h2>
        <button className="btn btn-secondary comic-border">
          GESTIONAR FAVORITOS
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {champions.map((championId, idx) => (
          <ChampionCard key={championId} championId={championId} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default ChampionsSection;