import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message, User } from '../../types';
import { websocketService } from '../../services/websocket';
import { useAuth } from '../Contexts/AuthContext';

export interface MessageInputProps {
  onSendMessage: (content: string) => void;
  onRequireLogin: () => void;
  currentUser: User | null; // Added currentUser to the props
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const { user: currentUser } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchMessages = async (): Promise<Message[]> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`);
        if (!response.ok) throw new Error('Erro ao carregar mensagens');
        return await response.json();
      } catch (error) {
        console.error("Erro ao carregar mensagens iniciais:", error);
        return [];
      }
    };
  
    const handleNewMessage = (message: Message) => {
      if (!isMounted) return;
      
      setMessages(prev => {
        // Evita duplicação de mensagens
        if (prev.some(m => m.id === message.id)) return prev;
        return [...prev, message];
      });
    };
  
    const initializeChat = async () => {
      try {
        // 1. Carrega mensagens iniciais
        const messages = await fetchMessages();
        if (isMounted) setMessages(messages);
        
        // 2. Conecta ao WebSocket
        websocketService.connect();
        
        // 3. Registra handler de mensagens
        return websocketService.onMessage(handleNewMessage);
      } catch (error) {
        console.error("Erro na inicialização do chat:", error);
      }
    };
  
    const cleanupPromise = initializeChat();
  
    return () => {
      isMounted = false;
      cleanupPromise.then(unsubscribe => {
        unsubscribe?.();
        websocketService.disconnect();
      });
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = (content: string) => {
    if (!content.trim() || !currentUser) return;

    const message: Message = {
      id: Date.now().toString(), // Adicione um ID único temporário
      content,
      sender: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isAdmin: currentUser.isAdmin || false
      },
      timestamp: new Date(), // Formato ISO para melhor compatibilidade
      reactions: []
    };

    websocketService.sendMessage(message);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-14rem)] bg-background-light rounded-lg overflow-hidden border border-primary/20 neon-border">
      <ChatHeader onlineUsers={new Set(messages.filter(msg => msg?.sender?.id).map(msg => msg.sender.id)).size} />
      

      <MessageList
        messages={messages.filter(msg => msg && msg.id)}
        currentUser={currentUser}
        endOfMessagesRef={endOfMessagesRef}
      />

      <MessageInput
        currentUser={currentUser}
        onSendMessage={sendMessage}
        onRequireLogin={() => setAuthOpen(true)} // Aqui abre o AuthModal
      />
    </div>
  );
};

export default Chat;