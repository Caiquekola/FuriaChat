import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Match {
  GameId: number;
  DateTime: string;
  HomeTeam: string;
  AwayTeam: string;
  HomeTeamId: number;
  AwayTeamId: number;
}

const MatchesPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate();
  const competitionId = 1; // ← ALTERE para a competição desejada

  useEffect(() => {
    fetch(`https://api.sportsdata.io/v3/csgo/scores/json/GamesByDate/2024-MAY-01?key=${import.meta.env.VITE_CSGOAPI_KEY}`)
      .then(res => res.json())
      .then(data => setMatches(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Próximos Jogos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <div 
            key={match.GameId} 
            className="border p-4 rounded cursor-pointer hover:bg-gray-100"
            onClick={() => navigate(`/match/${match.GameId}`)}
          >
            <h2 className="font-semibold">{match.HomeTeam} vs {match.AwayTeam}</h2>
            <p>Data/Hora: {new Date(match.DateTime).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchesPage;
