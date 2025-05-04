import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { Message, User } from '../../types';
import { websocketService } from '../../services/websocket';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => []);
  const [currentUser] = useState<User>({
    id: 'user1',
    username: 'FuriaFan123',
    avatar: 'https://i.pravatar.cc/150?img=1',
    isAdmin: false
  });

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
    if (!content.trim()) return;

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
      <ChatHeader onlineUsers={new Set(messages.map(msg => msg.sender.id)).size}/>
      
      <MessageList 
        messages={messages.filter(msg => msg && msg.id)} 
        currentUser={currentUser} 
        endOfMessagesRef={endOfMessagesRef}
      />
      
      <MessageInput 
        onSendMessage={sendMessage} 
      />
    </div>
  );
};

export default Chat;