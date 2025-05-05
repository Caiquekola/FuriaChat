import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface ChatMessage {
  id: string;
  user: string;
  content: string;
}

const MatchChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      user: "Você",
      content: input
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat da Partida - ID {id}</h1>

      <div className="border p-4 h-96 overflow-y-auto mb-4 space-y-2">
        {messages.map(msg => (
          <div key={msg.id} className="p-2 bg-background rounded">
            <strong>{msg.user}</strong>: {msg.content}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="border rounded px-4 py-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-primary text-white px-4 rounded">Enviar</button>
      </div>
    </div>
  );
};

export default MatchChat;
