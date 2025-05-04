import React, { createContext, useState, useContext, PropsWithChildren, useCallback } from 'react';

interface User {
  id: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: Omit<User, 'isAdmin'>) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((userData: Omit<User, 'isAdmin'>) => {
    setUser({
      ...userData,
      isAdmin: false, // Ou você pode receber isso do seu backend
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    // Adicione aqui qualquer limpeza adicional (token, localStorage, etc)
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};