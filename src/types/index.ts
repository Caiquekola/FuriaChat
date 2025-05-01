export interface User {
  id: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
}

export interface Reaction {
  emoji: string;
  count: number;
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  reactions: Reaction[];
}

export interface TeamInfo {
  name: string;
  logo: string;
  score: number;
}

export interface Match {
  id?: string;
  tournament: string;
  team1: TeamInfo;
  team2: TeamInfo;
  date?: string;
  time: string;
  map?: string;
  round?: number;
  bestOf?: number;
  status?: 'upcoming' | 'live' | 'completed';
}