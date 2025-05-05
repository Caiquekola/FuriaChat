import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Match {
  GameId: number;
  DateTime: string;
  HomeTeam: string;
  AwayTeam: string;
  HomeTeamId: number;
  AwayTeamId: number;
}

const simulatedMatches: Match[] = [
  { GameId: 1, DateTime: '2025-06-01T15:00:00', HomeTeam: 'FURIA', AwayTeam: 'Team Liquid', HomeTeamId: 1, AwayTeamId: 2 },
  { GameId: 2, DateTime: '2025-06-02T18:00:00', HomeTeam: 'FURIA', AwayTeam: 'NAVI', HomeTeamId: 1, AwayTeamId: 3 },
  { GameId: 3, DateTime: '2025-06-03T20:00:00', HomeTeam: 'FURIA', AwayTeam: 'Astralis', HomeTeamId: 1, AwayTeamId: 4 },
  { GameId: 4, DateTime: '2025-06-04T16:00:00', HomeTeam: 'FURIA', AwayTeam: 'G2', HomeTeamId: 1, AwayTeamId: 5 },
  { GameId: 5, DateTime: '2025-06-05T19:00:00', HomeTeam: 'FURIA', AwayTeam: 'MOUZ', HomeTeamId: 1, AwayTeamId: 6 },
  { GameId: 6, DateTime: '2025-06-06T13:00:00', HomeTeam: 'FURIA', AwayTeam: 'ENCE', HomeTeamId: 1, AwayTeamId: 7 },
  { GameId: 7, DateTime: '2025-06-07T22:00:00', HomeTeam: 'FURIA', AwayTeam: 'Vitality', HomeTeamId: 1, AwayTeamId: 8 },
  { GameId: 8, DateTime: '2025-06-08T21:00:00', HomeTeam: 'FURIA', AwayTeam: 'Heroic', HomeTeamId: 1, AwayTeamId: 9 },
];

const MatchesPage: React.FC = () => {
  const [matches] = useState<Match[]>(simulatedMatches);
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Próximos Jogos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <div 
            key={match.GameId} 
            className="border p-4 rounded cursor-pointer hover:bg-gray-100 transition"
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
