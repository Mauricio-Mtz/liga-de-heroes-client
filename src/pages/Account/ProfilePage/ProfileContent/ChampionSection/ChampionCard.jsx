import { useState, useEffect } from 'react';

const ChampionCard = ({ championId }) => {
  const [championData, setChampionData] = useState(null);

  useEffect(() => {
    const fetchChampionData = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/13.24.1/data/es_ES/champion.json');
        const data = await response.json();
        
        // Encontrar campeón por ID
        const champion = Object.values(data.data).find(
          champ => champ.key === championId
        );

        setChampionData(champion);
      } catch (error) {
        console.error('Error fetching champion data:', error);
      }
    };

    fetchChampionData();
  }, [championId]);

  if (!championData) return <div>Cargando...</div>;

  return (
    <div className="comic-border p-2 text-center">
      <div className="relative comic-border p-1 mb-2">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/champion/${championData.id}.png`}
          alt={championData.name}
          className="w-full h-auto"
        />
      </div>
      <div className="font-bold">{championData.name}</div>
      <div className="text-xs opacity-70">Campeón</div>
    </div>
  );
};

export default ChampionCard;