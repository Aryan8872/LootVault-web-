import axios from "axios";
import { useAuth } from "../contexts/AuthContext/AuthContext.js";
import { useEffect, useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

const useAxiosInterceptor = () => {
  const { accessToken, refreshAccessToken, logout } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false); // Track token refresh status

  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        console.log("Adding Authorization:", accessToken); // Debug log

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => response, // Handle successful response
      async (error) => {
        // Only check for 403 errors (Unauthorized or token-related errors)
        if (error.response?.status === 403 && !error.config._retry && !isRefreshing) {
          // Prevent infinite loops if token refresh fails and prevent retry until refresh is done
          error.config._retry = true;
          setIsRefreshing(true); // Set the loading state to true when token refresh starts

          console.log("Attempting to refresh the token...");

          try {
            const newAccessToken = await refreshAccessToken(); // Call your refresh function

            if (newAccessToken) {
              // Set the new token in the request header
              error.config.headers.Authorization = `Bearer ${newAccessToken}`;
              console.log(`New token: ${newAccessToken}`);

              // Retry the original request with the new access token
              return axiosInstance(error.config);
            } else {
              throw new Error("Failed to refresh access token");
            }
          } catch (error) {
            console.error("Token refresh failed:", error);
            logout(); // Log out the user if refresh fails
          } finally {
            setIsRefreshing(false); // Set the loading state back to false after refresh
          }
        }

        // Return the error if no refresh was attempted or other errors occur
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on component unmount
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [accessToken, refreshAccessToken, logout, isRefreshing]); // Include isRefreshing in the dependencies

  return axiosInstance;
};

export default useAxiosInterceptor;
