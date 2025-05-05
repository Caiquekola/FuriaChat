import React, { useEffect, useState } from 'react';
import LiveMatch from './LiveMatch';

interface ApiMatch {
  GameId: number;
  DateTime: string;
  HomeTeam: string;
  AwayTeam: string;
  HomeTeamId: number;
  AwayTeamId: number;
  Status: string;
}

interface Match {
  id: string;
  time: string;
  tournament: string;
  team1: {
    name: string;
    logo: string;
    score: number;
  };
  team2: {
    name: string;
    logo: string;
    score: number;
  };
  map: string;
  round: number;
}

const GameStatus: React.FC = () => {
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    fetch(`https://api.sportsdata.io/v3/csgo/scores/json/GamesByDate/2024-MAY-01?key=${import.meta.env.VITE_CSGOAPI_KEY}`)
      .then(res => res.json())
      .then((data: ApiMatch[]) => {
        // Filtrar partidas onde a FURIA está jogando
        const furiaMatch = data.find(m => 
          m.HomeTeam.toLowerCase().includes("furia") ||
          m.AwayTeam.toLowerCase().includes("furia")
        );

        if (furiaMatch) {
          setMatch({
            id: furiaMatch.GameId.toString(), 
            time: new Date(furiaMatch.DateTime).toLocaleTimeString(),
            tournament: "CS:GO Tournament",
            team1: {
              name: furiaMatch.HomeTeam,
              logo: "https://upload.wikimedia.org/wikipedia/en/5/57/FURIA_Esports_logo.png",
              score: Math.floor(Math.random() * 16)
            },
            team2: {
              name: furiaMatch.AwayTeam,
              logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg",
              score: Math.floor(Math.random() * 16)
            },
            map: "Mirage",
            round: Math.floor(Math.random() * 30)
          });
          
        }
      })
      .catch(err => console.error(err));
  }, []);

  if (!match) {
    return (
      <div className="p-4 text-text-secondary text-sm">
        Nenhum jogo da FURIA no momento.
      </div>
    );
  }

  return (
    <LiveMatch match={match} />
  );
};

export default GameStatus;
