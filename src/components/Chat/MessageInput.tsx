import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="border-t border-primary/20 p-4 bg-background-light">
      <form onSubmit={handleSubmit} className="flex items-center">
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-background text-text-secondary hover:text-primary transition-colors duration-300"
        >
          <Smile size={20} />
        </button>
        <button 
          type="button" 
          className="p-2 rounded-full hover:bg-background text-text-secondary hover:text-primary transition-colors duration-300"
        >
          <Paperclip size={20} />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 mx-2 py-2 px-4 bg-background rounded-full focus:outline-none focus:ring-1 focus:ring-primary text-text"
        />
        <button 
          type="submit" 
          className={`p-2 rounded-full ${
            message.trim() 
              ? 'bg-primary hover:bg-primary-dark text-white' 
              : 'bg-background text-text-secondary'
          } transition-colors duration-300`}
          disabled={!message.trim()}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;