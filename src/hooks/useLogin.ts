import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginData {
  name: string;
  email: string;
}

interface UseLoginReturn {
  login: (data: LoginData) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useLogin(onSuccess?: () => void): UseLoginReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      await authLogin(data.name, data.email);

      if (onSuccess) {
        onSuccess();
      }

      navigate("/search");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    login,
    isLoading,
    error,
    clearError,
  };
}
