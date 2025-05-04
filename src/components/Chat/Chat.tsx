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
    const controller = new AbortController();
  
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`, {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error('Erro ao carregar mensagens');
        
        const data = await response.json();
        if (isMounted) {
          const adapted = adaptMessages(data);
          setMessages(adapted);
        }
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Erro ao carregar mensagens:', error);
        }
      }
    };

    
    const adaptMessages = (messages: any[]): Message[] => {
      return messages.map((msg) => {
        return {
          id: msg.id,
          content: msg.content,
          sender: {
            id: msg.senderId,
            username: msg.senderUsername || "Anônimo",
            avatar: msg.senderAvatar || "https://i.pravatar.cc/150?u=unknown",
            isAdmin: msg.admin || false
          },
          timestamp: msg.timestamp ? new Date(msg.timestamp) : new Date(),
          reactions: msg.reactions || []
        };
      });
    };
    const handleNewMessage = (message: any) => {
      if (!isMounted) return;
      
      // Verificação simplificada
      if (!message?.id || !message?.content || !message?.sender?.id) {
        console.warn('Mensagem inválida recebida:', message);
        return;
      }
  
      setMessages(prev => {
        // Previne duplicatas
        if (prev.some(m => m.id === message.id)) return prev;
        
        // Formatação garantida
        const formattedMsg = {
          ...message,
          sender: {
            id: message.sender.id,
            username: message.sender.username || 'Anônimo',
            avatar: message.sender.avatar || 'https://i.pravatar.cc/150?u=unknown',
            isAdmin: Boolean(message.sender.isAdmin)
          },
          timestamp: message.timestamp ? new Date(message.timestamp) : new Date()
        };
        
        return [...prev, formattedMsg];
      });
    };
  
    // Conexão WebSocket
    websocketService.connect();
    const unsubscribe = websocketService.onMessage(handleNewMessage);
  
    // Carrega mensagens iniciais
    fetchMessages();
  
    return () => {
      isMounted = false;
      controller.abort();
      unsubscribe();
      websocketService.disconnect();
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