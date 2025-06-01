import type { ReactNode } from "react";
import Spinner from "./Spinner";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}

export function Button({
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  children,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors";

  const variantClasses = {
    primary:
      loading || disabled
        ? "bg-primary-300 cursor-not-allowed text-white"
        : "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500",
    secondary:
      "bg-white text-primary-500 border border-primary-500 hover:bg-gray-50 focus:ring-primary-500",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${className}`;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
    >
      {loading ? <Spinner size="sm" color="white" /> : children}
    </button>
  );
}
