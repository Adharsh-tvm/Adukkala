"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default function AuthProvider({
  children,
  isAuthenticated: initialAuthenticated,
}: {
  children: ReactNode;
  isAuthenticated: boolean;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthenticated);

  useEffect(() => {
    setIsAuthenticated(initialAuthenticated);
  }, [initialAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
