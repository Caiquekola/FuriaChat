import React from 'react';
import { useParams } from 'react-router-dom';

const MatchChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat da Partida - ID {id}</h1>

      <div className="border p-4 h-96 overflow-y-auto mb-4">
        {/* Aqui você pode integrar com WebSocket */}
        <p>Mensagens do Chat vão aqui...</p>
      </div>

      <input
        type="text"
        placeholder="Digite sua mensagem..."
        className="border rounded px-4 py-2 w-full"
      />
    </div>
  );
};

export default MatchChat;
