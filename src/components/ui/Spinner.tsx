interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: "primary" | "white" | "gray";
}

function Spinner({
  size = "md",
  className = "",
  color = "primary",
}: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-2",
    xl: "h-16 w-16 border-4",
  };

  const colorClasses = {
    primary: "border-primary-500 border-t-transparent",
    white: "border-white border-t-transparent",
    gray: "border-gray-400 border-t-transparent",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}

export default Spinner;
