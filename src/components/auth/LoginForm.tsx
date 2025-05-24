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

function LoginSpinner() {
  return (
    <div className="flex justify-center items-center py-1">
      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
    </div>
  );
}

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
      await login(data.name, data.email);

      if (onSuccess) {
        onSuccess();
      }

      navigate("/search");
    } catch (err) {
      console.error("Login failed", err);
      setError("Login failed. Please check your credentials and try again.");
    } finally {
      setIsLoading(true);
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
          {isLoading ? <LoginSpinner /> : "Sign in"}
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
