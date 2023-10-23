import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  signup: (username: string) => Promise<void>;
  signin: (username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = user !== null;

  const signup = async (username: string) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_NEST + "auth/register",
        {
          method: "POST",
          body: JSON.stringify({ username }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle response
      const data = await response.json();
      setUser(data);
    } catch (error) {
      // Handle registration error
      console.error("Signup error:", error);
    }
  };

  const signin = async (username: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_NEST + "auth/login", {
        method: "POST",
        body: JSON.stringify({ username }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Handle response
      const data = await response.json();
      setUser(data);
    } catch (error) {
      // Handle login error
      console.error("Signin error:", error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signup, signin, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
