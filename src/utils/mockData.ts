import { Message, User, Match } from '../types';

// Mock users
const mockUsers: User[] = [
  {
    id: 'user1',
    username: 'FuriaFan123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isAdmin: false
  },
  {
    id: 'user2',
    username: 'CSGOLover',
    avatar: 'https://i.pravatar.cc/150?img=2',
    isAdmin: false
  },
  {
    id: 'user3',
    username: 'BRazilPride',
    avatar: 'https://i.pravatar.cc/150?img=3',
    isAdmin: false
  },
  {
    id: 'user4',
    username: 'KSCERATO_Fan',
    avatar: 'https://i.pravatar.cc/150?img=4',
    isAdmin: false
  },
  {
    id: 'admin1',
    username: 'FURIA_Mod',
    avatar: 'https://i.pravatar.cc/150?img=10',
    isAdmin: true
  }
];

// Mock messages
const mockMessages: string[] = [
  'Let\'s go FURIA! 🔥',
  'That was an amazing play!',
  'arT is on fire today!',
  'KSCERATO with the clutch!',
  'What a comeback!',
  'Who\'s watching from Brazil? 🇧🇷',
  'That AWP shot was insane',
  'Drop me your predictions for the next match',
  'This tournament is so exciting',
  'Yuurih MVP for sure',
  'Anyone else nervous about the match against NAVI?',
  'That spray control was perfect',
  'Brazilian CS is the best!',
  'Can\'t wait for the major',
  'How long have you been a FURIA fan?'
];

const mockReactions = [
  { emoji: '❤️', count: 3 },
  { emoji: '👍', count: 5 },
  { emoji: '🔥', count: 7 },
  { emoji: '😮', count: 2 }
];

// Generate random messages
export const generateRandomMessages = (count: number): Message[] => {
  const messages: Message[] = [];
  
  for (let i = 0; i < count; i++) {
    // Pick a random user
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    
    // Pick a random message
    const content = mockMessages[Math.floor(Math.random() * mockMessages.length)];
    
    // Generate a timestamp within the last hour
    const timestamp = new Date(Date.now() - Math.floor(Math.random() * 3600000));
    
    // Maybe add reactions (30% chance)
    const reactions = Math.random() < 0.3 
      ? [mockReactions[Math.floor(Math.random() * mockReactions.length)]]
      : [];
    
    messages.push({
      id: `msg-${i}-${Date.now()}`,
      content,
      sender: user,
      timestamp,
      reactions
    });
  }
  
  // Sort by timestamp
  return messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
};

// Generate a mock live match
export const generateMockMatch = (): Match => {
  return {
    id: 'match-1',
    tournament: 'ESL Pro League Season 21',
    team1: {
      name: 'FURIA',
      logo: 'https://i.imgur.com/MH5r3rG.png',
      score: Math.floor(Math.random() * 12)
    },
    team2: {
      name: 'NAVI',
      logo: 'https://i.imgur.com/Pcn6Ic7.png',
      score: Math.floor(Math.random() * 10)
    },
    time: '01:23:45',
    map: ['Mirage', 'Inferno', 'Nuke', 'Ancient', 'Vertigo'][Math.floor(Math.random() * 5)],
    round: Math.floor(Math.random() * 30),
    status: 'live'
  };
};

// Generate upcoming matches
export const generateUpcomingMatches = (count: number): Match[] => {
  const opponents = [
    { name: 'NAVI', logo: 'https://i.imgur.com/Pcn6Ic7.png' },
    { name: 'Liquid', logo: 'https://i.imgur.com/XWkpcRX.png' },
    { name: 'Vitality', logo: 'https://i.imgur.com/1SunJcX.png' },
    { name: 'FaZe', logo: 'https://i.imgur.com/U7UkmLe.png' },
    { name: 'G2', logo: 'https://i.imgur.com/sLmUUSU.png' }
  ];
  
  const tournaments = [
    'ESL Pro League',
    'BLAST Premier',
    'IEM Katowice',
    'Rio Major Qualifier',
    'CS Summit'
  ];
  
  const matches: Match[] = [];
  
  for (let i = 0; i < count; i++) {
    const opponent = opponents[Math.floor(Math.random() * opponents.length)];
    const tournament = tournaments[Math.floor(Math.random() * tournaments.length)];
    const days = i + 1;
    const date = new Date();
    date.setDate(date.getDate() + days);
    
    matches.push({
      id: `upcoming-${i}`,
      tournament,
      team1: {
        name: 'FURIA',
        logo: 'https://i.imgur.com/MH5r3rG.png',
        score: 0
      },
      team2: {
        name: opponent.name,
        logo: opponent.logo,
        score: 0
      },
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      time: `${Math.floor(Math.random() * 12 + 1)}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
      bestOf: [3, 5][Math.floor(Math.random() * 2)],
      status: 'upcoming'
    });
  }
  
  return matches;
};