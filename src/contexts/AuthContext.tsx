import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import config, { getApiUrl } from "../config";
import type { PropsWithChildren } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (name: string, email: string) => Promise<void>;
  logout: () => Promise<void>;
  userName: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: async () => {},
  logout: async () => {},
  userName: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const cleanupLocalState = useCallback(() => {
    setIsLoggedIn(false);
    setUserName(null);
    localStorage.removeItem("userName");
  }, []);

  const login = useCallback(async (name: string, email: string) => {
    try {
      const response = await fetch(getApiUrl(config.api.endpoints.auth.login), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
        credentials: "include",
      });

      if (!response.ok) {
        let errorMessage = `Login failed with status: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (error) {
          console.error("Failed to parse error response:", error);
        }
        throw new Error(errorMessage);
      }

      setIsLoggedIn(true);
      setUserName(name);
      localStorage.setItem("userName", name);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      console.log("Attempting logout");

      const response = await fetch(
        getApiUrl(config.api.endpoints.auth.logout),
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

      cleanupLocalState();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      cleanupLocalState();
    }
  }, [cleanupLocalState]);

  useEffect(() => {
    const checkAuthentication = async () => {
      const savedUserName = localStorage.getItem("userName");

      if (savedUserName) {
        try {
          const response = await fetch(
            getApiUrl(config.api.endpoints.dogs.breeds),
            {
              credentials: "include",
            }
          );

          if (response.ok) {
            setUserName(savedUserName);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem("userName");
          }
        } catch (error) {
          console.error("Error checking authentication:", error);
          localStorage.removeItem("userName");
        }
      }
    };

    checkAuthentication();
  }, []);

  const memoizedValue = React.useMemo(
    () => ({
      isLoggedIn,
      login,
      logout,
      userName,
    }),
    [isLoggedIn, userName, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
