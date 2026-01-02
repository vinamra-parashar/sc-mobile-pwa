import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface User {
  username: string;
  name: string;
  accountNumber: string;
  balance: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  updateUserBalance: (newBalance: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Hardcoded user credentials (for demo purposes only)
const DEMO_USERS = [
  { 
    username: 'user1', 
    password: 'password1', 
    name: 'Vinamra Parashar', 
    accountNumber: '23310972560',
    balance: 230513
  },
  { 
    username: 'user2', 
    password: 'password2cvv', 
    name: 'Jane Smith', 
    accountNumber: '0987654321',
    balance: 150000
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      // In a real app, you would verify the token here
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const updateUserBalance = (newBalance: number) => {
    if (user) {
      setUser({ ...user, balance: newBalance });
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = DEMO_USERS.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          const { username, name, accountNumber, balance } = foundUser;
          setUser({ username, name, accountNumber, balance });
          localStorage.setItem('isAuthenticated', 'true');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateUserBalance,
      isAuthenticated: !!user, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
