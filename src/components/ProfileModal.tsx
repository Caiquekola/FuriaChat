// src/components/ProfileModal.tsx
import React, { useState } from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
    avatar: string;
  };
  onSave: (username: string, avatar: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user.username);
  const [avatar, setAvatar] = useState(user.avatar);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 space-y-4">
        <h2 className="text-lg font-semibold">Editar Perfil</h2>
        
        <input
          type="text"
          placeholder="Novo Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        
        <input
          type="text"
          placeholder="Novo Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button
            onClick={() => onSave(username, avatar)}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
