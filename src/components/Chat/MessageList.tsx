import React, { RefObject } from 'react';
import MessageItem from './MessageItem';
import { Message, User } from '../../types';

interface MessageListProps {
  messages: Message[];
  currentUser: User | null;
  endOfMessagesRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, endOfMessagesRef }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <React.Fragment key={message.id}>
          {message?.sender?.id ? (
            <MessageItem message={message} />
          ) : (
            <div className="text-red-500 text-xs">
              Mensagem inválida (ID: {message.id})
            </div>
          )}
        </React.Fragment>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;