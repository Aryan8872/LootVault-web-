import axios from "axios";
import React, { createContext, ReactNode, useState } from "react";

// Define types for the user and context
interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken:string,
  userData:User,
  refreshAccessToken: () => Promise<string>
  login: (token: string, refreshToken: string,user:User) => void;
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
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [userData, setUser] = useState<User>({});





  const login = (authToken: string,refreshToken:string,user:User) => {
    if (!authToken) {
      console.error("No token or refresh token provided!");
      return;
    }

    setUser(user)
    setIsAuthenticated(true);
    setRefreshToken(refreshToken)
    setAccessToken(authToken);
    console.log(`access token: ${accessToken}`)

  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/user/refresh", 
        { refreshToken },  // Send refreshToken in the body
        {
          // Optional: Add headers if needed (e.g., for authentication)
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      setAccessToken(response.data.accessToken);
      return response.data.accessToken;
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/api/user/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setAccessToken('');
  };

  // useLayoutEffect(() => {   / uselayout blocks rest of the rendering components and executes first 
  //   const authInterceptor = api.interceptors.request.use((config) => {
  //     config.headers.Authorization =
  //       !contig._retry && token
  //         ? `Bearer ${token}`
  //         : config.headers.Authorization;
  //     return config;
  //   });
  //   return () => {
  //     api.interceptors.request.eject(authInterceptor);
  //   };
  // }, [token]);








  return (
    <AuthContext.Provider value={{ accessToken,refreshAccessToken,isAuthenticated,userData, login, logout }}>
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

