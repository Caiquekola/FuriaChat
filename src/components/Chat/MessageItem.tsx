import React from 'react';
import { Clock } from 'lucide-react';
import { Message } from '../../types';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isOwnMessage }) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div 
      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
    >
      <div className={`flex ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} max-w-[80%]`}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img 
            src={message.sender.avatar || "https://i.pravatar.cc/150?u=default"} 
            alt={message.sender.username || "Usuário"} 
            className={`h-8 w-8 rounded-full ${message.sender.isAdmin ? 'ring-2 ring-accent' : ''}`}
          />
        </div>

        {/* Message content */}
        <div 
          className={`mx-2 ${
            isOwnMessage 
              ? 'bg-primary bg-opacity-30 rounded-tl-2xl rounded-bl-2xl rounded-tr-sm rounded-br-2xl' 
              : 'bg-background-light rounded-tr-2xl rounded-br-2xl rounded-tl-sm rounded-bl-2xl border border-primary/10'
          } px-4 py-2 shadow-sm`}
        >
          <div className="flex items-center mb-1">
            <span 
              className={`font-semibold text-sm ${
                message.sender.isAdmin ? 'text-accent' : 'text-primary'
              }`}
            >
              {message.sender.username || "Usuário"}
            </span>
            <span className="text-text-secondary text-xs ml-2 flex items-center">
              <Clock size={10} className="mr-1" />
              {formatTime(message.timestamp)}
            </span>
          </div>
          <p className="text-text">{message.content}</p>
          
          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex mt-2 space-x-1">
              {message.reactions.map((reaction, index) => (
                <span 
                  key={index} 
                  className="bg-background px-2 py-0.5 rounded-full text-xs flex items-center"
                >
                  {reaction.emoji} <span className="ml-1">{reaction.count}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;