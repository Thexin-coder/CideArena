import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types/user';

interface AuthContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@codearena.com',
    role: 'admin',
    solvedProblems: ['1', '2', '3', '5'],
    badges: ['first-solve', 'streak-7', 'problem-creator'],
    createdAt: new Date('2023-01-01').toISOString(),
  },
  {
    id: '2',
    username: 'owner',
    email: 'owner@codearena.com',
    role: 'owner',
    solvedProblems: ['1', '2', '3', '4', '5', '10', '15'],
    badges: ['first-solve', 'streak-30', 'problem-creator', 'contest-winner'],
    createdAt: new Date('2023-01-01').toISOString(),
  },
  {
    id: '3',
    username: 'user',
    email: 'user@example.com',
    role: 'user',
    solvedProblems: ['1', '2'],
    badges: ['first-solve'],
    createdAt: new Date('2023-01-15').toISOString(),
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsInitialized(true);
  }, []);

  const login = async (username: string, password: string) => {
    // In a real app, this would be an API call
    const foundUser = MOCK_USERS.find(u => u.username === username);
    
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    
    // In a real app, you would verify the password here
    // For demo, we just check if username exists
    
    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(foundUser));
  };

  const register = async (username: string, email: string, password: string) => {
    // In a real app, this would be an API call
    const userExists = MOCK_USERS.some(u => 
      u.username === username || u.email === email
    );
    
    if (userExists) {
      throw new Error('Username or email already exists');
    }
    
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      username,
      email,
      role: 'user' as UserRole,
      solvedProblems: [],
      badges: [],
      createdAt: new Date().toISOString(),
    };
    
    MOCK_USERS.push(newUser);
    
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      isInitialized,
      isAuthenticated,
      user,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};