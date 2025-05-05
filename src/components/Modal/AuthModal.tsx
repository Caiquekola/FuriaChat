import React, { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { X } from 'lucide-react'; // Ícone de fechar (Lucide)

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const { login, user: currentUser } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async () => {
    if (!username.trim()) {
      setError('É necessário preencher um nome de usuário.');
      return;
    }

    try {
      const randomAvatarId = Math.floor(Math.random() * 70) + 1;
      const avatar = `https://i.pravatar.cc/150?img=${randomAvatarId}`;
      
      const newUser = {
        id: `user-${Date.now()}`,
        username: username.trim(),
        avatar,
        isAdmin: false
      };

      // Envia para o backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) throw new Error('Falha ao registrar');

      login(newUser);
      setSuccess(true);
      setUsername('');
      setError('');

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000); // Fecha depois de 2 segundos
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao registrar');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-background-light p-8 rounded-lg shadow-lg w-80 relative border border-primary/30">
        
        {/* Botão de fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-text-secondary hover:text-primary transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-primary text-center">Crie seu Nome</h2>

        {success ? (
          <div className="text-success text-center font-medium">
            🎉 Usuário registrado com sucesso!
          </div>
        ) : (
          <>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu nome de usuário"
              className="w-full p-2 mb-4 border rounded-md focus:ring-2 focus:ring-primary text-black bg-background"
            />

            {error && (
              <div className="text-red-500 text-sm mb-4 text-center">
                {error}
              </div>
            )}

            <button
              onClick={handleRegister}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2 rounded-md font-semibold transition-colors"
            >
              Registrar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
