import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LiveMatch from './LiveMatch';

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
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const upcomingMatches: Match[] = [
      {
        id: "1",
        time: "2025-05-15 18:00",
        tournament: "ESL Pro League",
        team1: {
          name: "FURIA",
          logo: "https://en.wikipedia.org/wiki/File:Furia_Esports_logo.png",
          score: 0
        },
        team2: {
          name: "NAVI",
          logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Natus_Vincere_logo.png",
          score: 0
        },
        map: "Inferno",
        round: 0
      },
      {
        id: "2",
        time: "2025-05-20 21:00",
        tournament: "BLAST Premier",
        team1: {
          name: "FURIA",
          logo: "https://en.wikipedia.org/wiki/File:Furia_Esports_logo.png",
          score: 0
        },
        team2: {
          name: "G2 Esports",
          logo: "https://upload.wikimedia.org/wikipedia/pt/2/23/G2_Esports_logo.png",
          score: 0
        },
        map: "Nuke",
        round: 0
      },
      {
        id: "3",
        time: "2025-06-01 14:00",
        tournament: "IEM Cologne",
        team1: {
          name: "FURIA",
          logo: "https://en.wikipedia.org/wiki/File:Furia_Esports_logo.png",
          score: 0
        },
        team2: {
          name: "Vitality",
          logo: "https://lol.fandom.com/wiki/Team_Vitality#/media/File:Team_Vitalitylogo_square.png",
          score: 0
        },
        map: "Ancient",
        round: 0
      }
    ];

    setMatches(upcomingMatches);
  }, []);

  const changeMatch = (direction: "prev" | "next") => {
    setFade(false); // Inicia o fade-out

    setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === "prev") {
          return prevIndex === 0 ? matches.length - 1 : prevIndex - 1;
        } else {
          return prevIndex === matches.length - 1 ? 0 : prevIndex + 1;
        }
      });
      setFade(true); // Inicia o fade-in
    }, 200); // Tempo da animação fade-out (igual no CSS)
  };

  if (matches.length === 0) {
    return (
      <div className="p-4 text-text-secondary text-sm">
        Nenhum jogo da FURIA no momento.
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="p-4 space-y-6 relative">
      <div
        className={`transition-opacity duration-300 ${
          fade ? "opacity-100" : "opacity-0"
        }`}
      >
        <LiveMatch match={currentMatch} />
      </div>

      <div className="flex justify-center items-center space-x-8 mt-2">
        <button
          onClick={() => changeMatch("prev")}
          className="p-2 bg-background-light border border-primary/20 rounded-full hover:bg-primary hover:text-white transition"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => changeMatch("next")}
          className="p-2 bg-background-light border border-primary/20 rounded-full hover:bg-primary hover:text-white transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default GameStatus;
