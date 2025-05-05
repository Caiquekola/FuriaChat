import React from 'react';
import { Play, MapPin, Clock } from 'lucide-react';
import { Match } from '../../types';

interface LiveMatchProps {
  match: Match;
}

const LiveMatch: React.FC<LiveMatchProps> = ({ match }) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-success animate-pulse mr-2"></div>
          <span className="text-success font-medium">LIVE</span>
        </div>
        <div className="text-text-secondary text-sm flex items-center">
          <Clock size={14} className="mr-1" />
          {match.time}
        </div>
      </div>

      <div className="relative bg-background p-6 rounded-lg shadow-md border border-primary/10">
        {/* Tournament name */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent px-4 py-1 rounded-full text-xs font-bold">
          {match.tournament}
        </div>

        {/* Teams */}
        <div className="flex justify-between items-center mt-3 mb-6">
          <Team 
            name={match.team1.name} 
            logo={match.team1.logo} 
            isHome={true}
          />
          
          <div className="text-center z-10">
            <div className="text-4xl font-bold mb-1">
              <span className={match.team1.score > match.team2.score ? 'text-primary' : 'text-text'}>
                {match.team1.score}
              </span>
              <span className="mx-2 text-text-secondary">-</span>
              <span className={match.team2.score > match.team1.score ? 'text-primary' : 'text-text'}>
                {match.team2.score}
              </span>
            </div>
          </div>

          <Team 
            name={match.team2.name} 
            logo={match.team2.logo} 
            isHome={false}
          />
        </div>

        {/* Map info */}
        <div className="flex justify-between bg-background-light p-3 rounded-lg text-sm">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2 text-text-secondary" />
            <span className="font-medium">Map: {match.map}</span>
          </div>
          <div className="flex items-center">
            <Play size={16} className="mr-2 text-text-secondary" />
            <span className="font-medium">Round: {match.round}</span>
          </div>
        </div>

        {/* MVP player (pode ser opcional ou fictício por enquanto) */}
        <div className="mt-4 bg-background-light p-3 rounded-lg">
          <div className="text-text-secondary text-xs mb-2">CURRENT MVP</div>
          <div className="flex items-center">
            <img 
              src="https://i.pravatar.cc/150?img=3" 
              alt="MVP Player" 
              className="h-10 w-10 rounded-full mr-3 border-2 border-primary"
            />
            <div>
              <div className="font-bold text-primary">arT</div>
              <div className="text-xs text-text-secondary">Exemplo MVP do time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Match Highlights</h3>
        <div className="space-y-3">
          {generateHighlights(match).map((highlight, index) => (
            <div 
              key={index} 
              className="p-3 bg-background rounded-lg border border-primary/10"
            >
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface TeamProps {
  name: string;
  logo: string;
  isHome: boolean;
}

const Team: React.FC<TeamProps> = ({ name, logo, isHome }) => {
  return (
    <div className={`flex flex-col items-center w-1/3 ${isHome ? 'text-left' : 'text-right'}`}>
      <img 
        src={logo} 
        alt={name} 
        className="h-16 w-16 object-contain mb-2"
      />
      <div className="font-bold text-lg">
        {name}
      </div>
    </div>
  );
};

// Função para gerar highlights fictícios baseados no time
const generateHighlights = (match: Match): string[] => {
  const highlights = [
    `🔥 ${match.team1.name} com uma entrada perfeita no bomb!`,
    `💥 ${match.team2.name} tentando a virada no round eco.`,
    `🎯 Jogador destaque da ${match.team1.name} com clutch importante.`
  ];

  return highlights;
};

export default LiveMatch;
