import React, { createContext, useState, useContext, PropsWithChildren } from 'react';

interface User {
  id: string;
  username: string;
  avatar: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
