import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  freeUsesRemaining: number;
  decrementFreeUses: () => void;
  addToHistory: (item: Omit<User["history"][0], "id" | "date">) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_USERS = [
  { username: "admin", password: "12345", isPremium: true },
  { username: "user1", password: "12345", isPremium: false }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [freeUsesRemaining, setFreeUsesRemaining] = useState(3);

  useEffect(() => {
    const savedUser = localStorage.getItem("softskills_user");
    const savedUses = localStorage.getItem("softskills_free_uses");
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedUses) {
      setFreeUsesRemaining(parseInt(savedUses, 10));
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const validUser = VALID_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (validUser) {
      const newUser: User = { 
        username: validUser.username, 
        isAuthenticated: true, 
        isPremium: validUser.isPremium,
        history: [] 
      };
      setUser(newUser);
      localStorage.setItem("softskills_user", JSON.stringify(newUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("softskills_user");
  };

  const decrementFreeUses = () => {
    const newUses = Math.max(0, freeUsesRemaining - 1);
    setFreeUsesRemaining(newUses);
    localStorage.setItem("softskills_free_uses", String(newUses));
  };

  const addToHistory = (item: any) => {
    if (!user) return;
    
    const newItem = {
      ...item,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };

    const updatedUser = {
      ...user,
      history: [newItem, ...(user.history || [])],
    };

    setUser(updatedUser);
    localStorage.setItem("softskills_user", JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user?.isAuthenticated,
        isLoading,
        freeUsesRemaining,
        decrementFreeUses,
        addToHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
