import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo ao Fúria Fan Chat!</h1>
      <p className="text-lg text-gray-500 mb-8">Entre no chat global para conversar com outros fãs.</p>
      <Link 
        to="/chat" 
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition"
      >
        Ir para o Chat Global
      </Link>
    </div>
  );
};

export default HomePage;
