import axios from "axios";
import React, { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

// Define types for the user and context
interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken:string,
  refreshAccessToken: () => Promise<string>
  login: (token: string, refreshToken: string) => void;
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



  // Helper function to check token expiry
  // const isTokenExpired = async (token: string): Promise<boolean> => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/check-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       const data = await response.json();
  //       console.error("Token is invalid or expired:", data.message);
  //       return true;
  //     }

  //     return false; // Token is valid
  //   } catch (error) {
  //     console.error("Error checking token expiry:", error);
  //     return true; // Treat as expired in case of error
  //   }
  // };


  // // Function to fetch user data from backend
  // const fetchUser = async (token: string) => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/user/getUser", {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to authenticate");
  //     }

  //     const data = await response.json();
  //     setUser(data.user);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //     localStorage.removeItem("token"); // Clear invalid token
  //   }
  // };

  // const refreshAuthToken = async (storedRefreshToken: string | null) => {
  //   if (!storedRefreshToken) {
  //     console.error("No refresh token available.");
  //     return;
  //   }

  //   try {
  //     const response = await fetch("/api/refresh-token", {
  //       method: "POST",
  //       body: JSON.stringify({ refreshToken: storedRefreshToken }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to refresh token");
  //     }

  //     const data = await response.json();
  //     const newToken = data.token;
  //     const newRefreshToken = data.refreshToken;

  //     // Store new tokens
  //     localStorage.setItem("token", newToken);
  //     localStorage.setItem("refreshToken", newRefreshToken);

  //     setToken(newToken);
  //     setRefreshToken(newRefreshToken);
  //     fetchUser(newToken);
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     setUser(null);
  //     setIsAuthenticated(false);
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("refreshToken");
  //   }
  // };

  const login = (authToken: string,refreshToken:string) => {
    if (!authToken) {
      console.error("No token or refresh token provided!");
      return;
    }

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
    <AuthContext.Provider value={{ accessToken,refreshAccessToken,isAuthenticated, login, logout }}>
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

