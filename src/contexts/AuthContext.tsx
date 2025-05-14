import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";

// Define the authentication context types
interface AuthContextType {
  isLoggedIn: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  userName: string | null;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  userName: null,
});

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Enhanced login function with better error handling and debugging
  const login = useCallback(async (name: string, email: string) => {
    try {
      console.log("Attempting login with:", { name, email });

      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
          credentials: "include", // Important for cookie handling
        }
      );

      console.log("Login response status:", response.status);

      // Only log headers in development
      if (process.env.NODE_ENV === "development") {
        console.log(
          "Login response headers:",
          Object.fromEntries([...response.headers])
        );
      }

      if (!response.ok) {
        // Try to get detailed error from response
        let errorMessage = `Login failed with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Ignore JSON parsing errors
        }
        throw new Error(errorMessage);
      }

      // Update state AFTER successful login
      setIsLoggedIn(true);
      setUserName(name);
      localStorage.setItem("userName", name);

      console.log("Login successful, auth state will be updated");

      // We don't need to return anything here
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // Re-throw to be handled by the component
    }
  }, []);

  // Enhanced logout function
  const logout = useCallback(async () => {
    try {
      console.log("Attempting logout");

      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.warn(
          `Logout request returned status ${response.status}, but continuing with local logout`
        );
      }

      // Clear state regardless of response
      setIsLoggedIn(false);
      setUserName(null);
      localStorage.removeItem("userName");

      console.log("Logout complete, auth state cleared");
    } catch (error) {
      console.error("Logout request failed:", error);
      // Still clear local state even if the API call fails
      setIsLoggedIn(false);
      setUserName(null);
      localStorage.removeItem("userName");
    }
  }, []);

  // Check for saved state on mount and verify if cookie is still valid
  useEffect(() => {
    const checkAuthentication = async () => {
      console.log("Checking authentication state on app load");
      const savedUserName = localStorage.getItem("userName");

      if (savedUserName) {
        console.log("Found saved username:", savedUserName);

        try {
          // Verify if the auth cookie is still valid
          console.log("Verifying auth cookie validity");
          const response = await fetch(
            "https://frontend-take-home-service.fetch.com/dogs/breeds",
            {
              credentials: "include",
            }
          );

          if (response.ok) {
            console.log("Auth check successful, restoring session");
            setUserName(savedUserName);
            setIsLoggedIn(true);
          } else {
            console.log("Auth check failed with status:", response.status);
            localStorage.removeItem("userName");
          }
        } catch (error) {
          console.error("Auth verification failed:", error);
          localStorage.removeItem("userName");
        }
      } else {
        console.log("No saved authentication found");
      }
    };

    checkAuthentication();
  }, []);

  // Create the auth context value
  const authContextValue = {
    isLoggedIn,
    login,
    logout,
    userName,
  };

  // Use memo for the context value to prevent unnecessary re-renders
  const memoizedValue = React.useMemo(
    () => authContextValue,
    [isLoggedIn, userName, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
