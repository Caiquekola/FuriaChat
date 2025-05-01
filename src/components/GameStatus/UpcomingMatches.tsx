import React from 'react';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Match } from '../../types';

interface UpcomingMatchesProps {
  matches: Match[];
}

const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ matches }) => {
  return (
    <div className="p-4">
      <div className="space-y-4">
        {matches.map((match, index) => (
          <div 
            key={index} 
            className="bg-background p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors duration-300"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-accent text-sm font-medium">
                {match.tournament}
              </span>
              <div className="flex items-center text-text-secondary text-sm">
                <Calendar size={14} className="mr-1" />
                {match.date}, {match.time}
              </div>
            </div>
            
            <div className="flex justify-between items-center my-4">
              <TeamMini 
                name={match.team1.name} 
                logo={match.team1.logo}
              />
              
              <div className="text-center px-2">
                <span className="text-text-secondary text-xs">VS</span>
              </div>
              
              <TeamMini 
                name={match.team2.name} 
                logo={match.team2.logo} 
              />
            </div>
            
            <div className="flex justify-between items-center text-xs text-text-secondary mt-3">
              <div className="flex items-center">
                <MapPin size={12} className="mr-1" />
                {match.map ? match.map : 'TBD'}
              </div>
              <div className="flex items-center">
                <Trophy size={12} className="mr-1" />
                Best of {match.bestOf || 3}
              </div>
            </div>

            <button className="mt-3 w-full py-2 bg-primary/10 hover:bg-primary/20 rounded text-primary text-sm transition-colors duration-300">
              Set Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

interface TeamMiniProps {
  name: string;
  logo: string;
}

const TeamMini: React.FC<TeamMiniProps> = ({ name, logo }) => {
  return (
    <div className="flex flex-col items-center w-2/5">
      <img 
        src={logo} 
        alt={name} 
        className="h-12 w-12 object-contain mb-2"
      />
      <div className="font-medium text-sm text-center">
        {name}
      </div>
    </div>
  );
};

export default UpcomingMatches;