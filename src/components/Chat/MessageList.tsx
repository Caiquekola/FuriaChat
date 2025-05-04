import React, { RefObject } from 'react';
import MessageItem from './MessageItem';
import { Message, User } from '../../types';

interface MessageListProps {
  messages: Message[];
  currentUser: User | null;
  endOfMessagesRef: RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  currentUser,
  endOfMessagesRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages
        .filter((msg): msg is Message => !!msg?.id && !!msg?.sender?.id)
        .map((message) => (
          <MessageItem
            key={message.id}
            message={message}
          />
        ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default MessageList;