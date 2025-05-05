import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../components/Contexts/AuthContext';
import { Message } from '../types';
import { Send } from 'lucide-react';

const MatchChat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Load messages when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/match-messages/${id}`)
      .then(res => res.json())
      .then(data => {
        const adapted = data.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(adapted);
      });
  }, [id]);

  // Scroll to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    if (!user) {
      alert('Você precisa de um nome de usuário para enviar mensagens.');
      return;
    }

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        isAdmin: user.isAdmin ?? false,
      },
      timestamp: new Date(),
      reactions: [],
    };

    // Send to backend
    await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/match-messages/${id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Chat da Partida</h1>

      <div className="border p-4 h-96 overflow-y-auto mb-4 rounded-lg bg-background-light">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <div className="text-sm text-primary font-bold">{msg.sender.username}</div>
            <div className="text-text mb-1">{msg.content}</div>
            <div className="text-xs text-text-secondary">{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded px-4 py-2 bg-background-light text-black"
        />
        <button 
          onClick={sendMessage} 
          className="bg-primary hover:bg-primary-dark text-white p-2 rounded"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MatchChat;
