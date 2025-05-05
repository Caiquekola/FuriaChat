import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-background-dark to-background-light text-center p-8">
      <div className="max-w-2xl space-y-8 animate-fade-in">
        {/* Título com efeito de gradiente e glow */}
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Bem-vindo ao <span className="text-white drop-shadow-glow">Fúria Fan Chat</span>!
        </h1>
        
        {/* Subtítulo estilizado */}
        <p className="text-xl md:text-2xl text-text-secondary font-medium mb-10">
          Conecte-se com a <span className="text-primary font-semibold">maior comunidade</span> de fãs da FURIA
        </p>
        
        {/* Botão super chamativo */}
        <Link 
          to="/chat" 
          className="
            relative
            inline-flex items-center justify-center
            px-8 py-4
            text-lg font-bold text-white
            bg-gradient-to-r from-primary to-primary-dark
            rounded-xl
            shadow-lg
            hover:shadow-glow
            transition-all
            duration-300
            transform hover:scale-105
            group
            overflow-hidden
          "
        >
          <span className="relative z-10 flex items-center">
            <MessageSquare className="mr-3" size={20} />
            Acessar Chat Global
          </span>
          
          {/* Efeito de brilho ao passar o mouse */}
          <span className="
            absolute inset-0
            bg-gradient-to-r from-primary/30 to-accent/30
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-500
          "></span>
        </Link>
        
        {/* Elementos decorativos opcionais */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;