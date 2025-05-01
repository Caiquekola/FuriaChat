import React, { RefObject } from 'react';
import MessageItem from './MessageItem';
import { Message, User } from '../../types';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  endOfMessagesRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  currentUser, 
  endOfMessagesRef 
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem 
          key={message.id} 
          message={message} 
          isOwnMessage={message.sender.id === currentUser.id} 
        />
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;