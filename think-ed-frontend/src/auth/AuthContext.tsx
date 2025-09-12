// src/auth/AuthContext.tsx
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

type UserRole = 'estudiante' | 'instructor' | null;

interface AuthContextType {
  userId: string | null;
  token: string | null;
  role: UserRole;
  login: (userId: string,  token: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(localStorage.getItem('userId'));
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [role, setRole] = useState<UserRole>(localStorage.getItem('role') as UserRole);

  const login = (newUserId: string, newToken: string, newRole: UserRole) => {
    setUserId(newUserId);
    setToken(newToken);
    setRole(newRole);
    localStorage.setItem('userId', newUserId);
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', newRole || '');
  };

  const logout = () => {
    setUserId(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };
  
  return (
    <AuthContext.Provider value={{ userId, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};