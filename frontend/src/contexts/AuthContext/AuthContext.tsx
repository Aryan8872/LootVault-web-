import axios from "axios";
import React, { createContext, ReactNode, useState, useEffect } from "react";

// Define types for the user and context
interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string;
  userData: User | null;
  refreshAccessToken: () => Promise<string | null>;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component to manage authentication state
const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userData, setUser] = useState<User | null>(null);

  // Load authentication data from localStorage when the component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedRefreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("userData");

    if (storedToken && storedRefreshToken && storedUser) {
      setAccessToken(storedToken);
      setRefreshToken(storedRefreshToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (authToken: string, refreshToken: string, user: User) => {
    if (!authToken || !refreshToken) {
      console.error("No token or refresh token provided!");
      return;
    }

    setUser(user);
    setIsAuthenticated(true);
    setRefreshToken(refreshToken);
    setAccessToken(authToken);

    // Store tokens and user in localStorage for persistence
    localStorage.setItem("accessToken", authToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/refresh",
        { refreshToken }, // Send refreshToken in the body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken = response.data.accessToken;
      setAccessToken(newAccessToken);
      localStorage.setItem("accessToken", newAccessToken); // Update stored token

      return newAccessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
      return null;
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }

    // Clear auth state and localStorage
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    setIsAuthenticated(false);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshAccessToken, isAuthenticated, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
