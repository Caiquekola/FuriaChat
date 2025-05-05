import React, { useState, useRef } from 'react';
import { Send, Smile, Paperclip } from 'lucide-react';
import { User } from '../../types';
import EmojiPicker from 'emoji-picker-react';
import { toast } from 'react-hot-toast'; // <-- IMPORTA O TOAST

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  currentUser: User | null;
  onRequireLogin: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ 
  onSendMessage, 
  currentUser, 
  onRequireLogin 
}) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEmojiClick = (emojiData: any) => {
    setMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!currentUser) {
      onRequireLogin();
      toast.error("Você precisa criar um nome de usuário para enviar mensagens.");
      return;
    }

    onSendMessage(message);
    setMessage('');
    setShowEmojiPicker(false);
  };

  return (
    <div className="border-t border-primary/20 p-4 bg-background-light relative">
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-10">
          <EmojiPicker 
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center">
        <button 
          type="button" 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
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

export default MessageInput;
