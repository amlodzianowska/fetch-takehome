import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginInputs {
  name: string;
  email: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

interface FormField {
  id: string;
  label: string;
  type?: string;
  error?: string;
  registration: UseFormRegisterReturn;
}

function FormField({
  id,
  label,
  type = "text",
  error,
  registration,
}: FormField) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        autoComplete={id}
        className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
          error ? "border-red-300" : "border-gray-300"
        } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
        {...registration}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}

const VALIDATION_RULES = {
  name: {
    required: "Name is required",
    minLength: {
      value: 2,
      message: "Name must have at least 2 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
};

function LoginForm({ onSuccess }: LoginFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Call the login function from AuthContext
      await login(data.name, data.email);

      console.log("Login successful, calling onSuccess callback if provided");

      // This should close the modal
      if (onSuccess) {
        onSuccess();
      }

      // Navigate to search page
      navigate("/search");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="space-y-4">
        <FormField
          id="name"
          label="Name"
          error={errors.name?.message}
          registration={register("name", VALIDATION_RULES.name)}
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          error={errors.email?.message}
          registration={register("email", VALIDATION_RULES.email)}
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
            isLoading
              ? "bg-primary-300 cursor-not-allowed"
              : "bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          }`}
        >
          {isLoading ? (
            <>
              {/* Simple spinner */}
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
