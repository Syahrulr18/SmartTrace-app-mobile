import React, { createContext, useCallback, useContext, useState } from "react";

export type UserRole = "petani" | "distributor" | "konsumen";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  location?: string;
  company?: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSignedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  selectRole: (role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock user data - in real app, this comes from backend
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split("@")[0],
        role: "petani", // Default role - will be changed in selectRole
        location: "Jakarta, Indonesia",
      };

      setUser(mockUser);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // After registration, auto-login
        const mockUser: User = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          email,
          name,
          role: "petani", // Default role
          location: "Jakarta, Indonesia",
        };

        setUser(mockUser);
      } catch (error) {
        console.error("Register error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const selectRole = useCallback(async (role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call to update role
      await new Promise((resolve) => setTimeout(resolve, 500));

      setUser((prevUser) => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          role,
          // Add role-specific data
          ...(role === "distributor" && { company: "PT Logistik Segar" }),
          ...(role === "konsumen" && { location: "Jakarta, Indonesia" }),
        };
      });
    } catch (error) {
      console.error("Select role error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isSignedIn: !!user,
    login,
    register,
    selectRole,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
