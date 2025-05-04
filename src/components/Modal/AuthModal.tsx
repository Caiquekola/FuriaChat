import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose  }) => {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  const handleRegister = () => {
    if (!username.trim()) return;

    const randomAvatarId = Math.floor(Math.random() * 70) + 1;
    const avatar = `https://i.pravatar.cc/150?img=${randomAvatarId}`;
    login({
      id: `user-${Date.now()}`,
      username,
      avatar,
    });

    
    onClose();
  };

  if(!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Register</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-2 text-black border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
