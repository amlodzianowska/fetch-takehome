import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { FormField } from "../ui/FormField";
import { ErrorAlert } from "../ui/ErrorAlert";
import { Button } from "../ui/Button";
import { useLogin } from "../../hooks/useLogin";
import { VALIDATION_RULES } from "../../utils/validation";

interface LoginInputs {
  name: string;
  email: string;
}

interface LoginFormProps {
  onSuccess?: () => void;
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, isLoading, error } = useLogin(onSuccess);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    await login(data);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorAlert message={error} />}

      <div className="space-y-4">
        <FormField
          id="name"
          label="Name"
          placeholder="Enter your name"
          error={errors.name?.message}
          registration={register("name", VALIDATION_RULES.name)}
        />

        <FormField
          id="email"
          label="Email address"
          type="email"
          placeholder="Enter your email"
          autoComplete="email"
          error={errors.email?.message}
          registration={register("email", VALIDATION_RULES.email)}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        loading={isLoading}
      >
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
