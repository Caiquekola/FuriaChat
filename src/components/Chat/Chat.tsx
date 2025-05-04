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
    // Connect to WebSocket
    websocketService.connect();

    // Load initial messages
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/messages`)
      .then(response => response.json())
      .then(data => setMessages(data));

    // Subscribe to new messages
    const unsubscribe = websocketService.onMessage((message) => {
      if (!message.id || !message.sender?.id) {
        console.warn("Mensagem inválida recebida do websocket:", message);
        return;
      }

      setMessages(prev => [...prev, message]);
    });


    return () => {
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

    const message: Partial<Message> = {
      content,
      sender: currentUser,
      timestamp: new Date(),
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