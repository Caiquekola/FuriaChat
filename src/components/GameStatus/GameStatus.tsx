import React, { useState, useEffect } from 'react';
import { Trophy, Calendar } from 'lucide-react';
import LiveMatch from './LiveMatch';
import UpcomingMatches from './UpcomingMatches';
import { Match } from '../../types';
import { websocketService } from '../../services/websocket';
import { generateUpcomingMatches } from '../../utils/mockData';

const GameStatus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming'>('live');
  const [liveMatch, setLiveMatch] = useState<Match | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);

  useEffect(() => {
    // Connect to WebSocket
    websocketService.connect();

    // Load initial game status
    fetch('http://localhost:8080/api/game/status')
    .then(res => {
      if (!res.ok) throw new Error('Erro HTTP: ' + res.status);
      return res.text();
    })
    .then(text => {
      if (!text) {
        console.log("Resposta vazia");
        return;
      }
  
      const data = JSON.parse(text);
      setLiveMatch(data);
    })
    .catch(error => console.error("Erro ao carregar o status do jogo:", error));
  
    // Subscribe to game status updates
    const unsubscribe = websocketService.onGameStatus((status) => {
      setLiveMatch(status);
    });

    // Load upcoming matches (still using mock data for this demo)
    setUpcomingMatches(generateUpcomingMatches(4));

    return () => {
      unsubscribe();
      websocketService.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-background-light rounded-lg overflow-hidden border border-primary/20 neon-border">
      <div className="p-4 border-b border-primary/20">
        <h2 className="text-xl font-semibold">Matches</h2>
        <div className="flex mt-3 border-b border-primary/10">
          <TabButton
            active={activeTab === 'live'}
            onClick={() => setActiveTab('live')}
            icon={<Trophy size={16} />}
            label="Live Match"
            showBadge={liveMatch !== null}
          />
          <TabButton
            active={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
            icon={<Calendar size={16} />}
            label="Upcoming"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'live' ? (
          liveMatch ? (
            <LiveMatch match={liveMatch} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="text-text-secondary mb-2">No live matches right now</div>
              <button
                className="mt-3 px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary transition-colors duration-300"
                onClick={() => setActiveTab('upcoming')}
              >
                View upcoming matches
              </button>
            </div>
          )
        ) : (
          <UpcomingMatches matches={upcomingMatches} />
        )}
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  showBadge?: boolean;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  onClick,
  icon,
  label,
  showBadge = false
}) => {
  return (
    <button
      className={`flex items-center px-4 py-2 relative ${active
        ? 'text-primary border-b-2 border-primary'
        : 'text-text-secondary hover:text-text'
        } transition-colors duration-300`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {label}
      {showBadge && (
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-success animate-pulse-slow"></span>
      )}
    </button>
  );
};

export default GameStatus;