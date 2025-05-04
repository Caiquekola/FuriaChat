import React, { useState } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { useAuth } from '../Contexts/AuthContext';
import AuthModal from '../Modal/AuthModal';
import { User } from '../../types'; // Adjust the import path as necessary

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  currentUser: User | any; // Consider using a more specific type instead of 'any'
  onRequireLogin: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  currentUser, 
  onRequireLogin 
}) => {
  const [message, setMessage] = useState('');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!currentUser) {
      onRequireLogin(); // Use the passed function instead of managing modal state here
      return;
    }

    onSendMessage(message);
    setMessage('');
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
          className="flex-1 mx-2 py-2 text-black px-4 bg-background rounded-full focus:outline-none focus:ring-1 focus:ring-primary "
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

export default MessageInput
