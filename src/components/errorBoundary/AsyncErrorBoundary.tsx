import ErrorBoundary from "./ErrorBoundary";
import type { ReactNode } from "react";
import type { ErrorInfo } from "react";

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

function AsyncErrorBoundary({
  children,
  fallback,
  onError,
}: AsyncErrorBoundaryProps) {
  const handleAsyncError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Async operation failed:", {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      isNetworkError:
        error.message.includes("fetch") || error.message.includes("network"),
      timestamp: new Date().toISOString(),
    });

    if (onError) {
      onError(error, errorInfo);
    }
  };

  const asyncFallback = fallback || (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-red-500 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Unable to load data
      </h3>
      <p className="text-gray-600 mb-4">
        We're having trouble connecting to our servers. Please check your
        internet connection and try again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <ErrorBoundary fallback={asyncFallback} onError={handleAsyncError}>
      {children}
    </ErrorBoundary>
  );
}

export default AsyncErrorBoundary;
