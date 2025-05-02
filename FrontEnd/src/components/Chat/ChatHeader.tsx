import React from 'react';
import { Users, Info } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-background-light border-b border-primary/20 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">
          FURIA Fan Chat
        </h2>
        <div className="ml-3 px-3 py-1 bg-primary/20 rounded-full flex items-center">
          <Users size={14} className="mr-1" />
          <span className="text-sm text-primary">234 online</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-background transition-colors duration-300">
          <Info size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;