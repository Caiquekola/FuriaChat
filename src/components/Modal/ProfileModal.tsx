import React, { useState } from 'react';
import ModalBase from './ModalBase';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string | '';
    avatar: string;
  } | null;
  onSave: (username: string, avatar: string) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [username, setUsername] = useState(user?.username);
  const [avatar, setAvatar] = useState(user?.avatar);

  const handleSave = () => {
    onSave(username || '', avatar || '');
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <ModalBase onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Editar Perfil</h2>
      <input
        type="text"
        placeholder="Novo username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <input
        type="text"
        placeholder="URL do Avatar"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-4"
      />
      <button
        onClick={handleSave}
        className="w-full bg-primary text-white py-2 rounded"
      >
        Salvar
      </button>
    </ModalBase>
  );
};

export default ProfileModal;
