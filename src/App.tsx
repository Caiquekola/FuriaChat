import React from 'react';
import { LayoutDashboard } from 'lucide-react';
import Layout from './components/Layout';
import Chat from './components/Chat/Chat';
import GameStatus from './components/GameStatus/GameStatus';
import './App.css';

function App() {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row w-full h-full gap-4">
        <div className="w-full lg:w-2/3 h-full">
          <Chat />
        </div>
        <div className="w-full lg:w-1/3 h-full">
          <GameStatus />
        </div>
      </div>
    </Layout>
  );
}

export default App;