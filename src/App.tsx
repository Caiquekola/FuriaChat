import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Chat from './components/Chat/Chat';
import GameStatus from './components/GameStatus/GameStatus';
import HomePage from './pages/HomePage';
import MatchesPage from './pages/Matches'; // Importa a página de partidas
import MatchChat from './pages/MatchChat'; // Importa a página de chat da partida
import './App.css';
import { AuthProvider } from './components/Contexts/AuthContext.tsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat" element={
              <div className="flex flex-col lg:flex-row w-full h-full gap-4">
                <div className="w-full lg:w-2/3 h-full">
                  <Chat />
                </div>
                <div className="w-full lg:w-1/3 h-full">
                  <GameStatus />
                </div>
              </div>
            } />
            <Route path="/matches" element={<MatchesPage />} /> {/* ROTA DE LISTA */}
            <Route path="/match/:id" element={<MatchChat />} /> {/* ROTA DO CHAT DA PARTIDA */}
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
