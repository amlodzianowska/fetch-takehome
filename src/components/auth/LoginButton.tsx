import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface LoginButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

function LoginButton({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  fullWidth = false,
}: LoginButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
    secondary:
      "bg-white text-primary-500 hover:bg-gray-50 border border-primary-500 focus:ring-primary-500",
    outline:
      "bg-transparent border-2 border-primary-500 hover:bg-text-primary-500 hover:text-primary-300 text-primary-500 focus:ring-white",
  };

  const sizeStyles = {
    sm: "text-sm px-3 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-8 py-3",
  };

  const widthStyles = fullWidth ? "w-full justify-center" : "";

  const combinedClassName = `inline-flex items-center ${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

  return (
    <button type="button" className={combinedClassName} onClick={onClick}>
      {children}
    </button>
  );
}

export default LoginButton;
