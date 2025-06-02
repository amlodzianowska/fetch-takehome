import React from "react";
import type { ErrorInfo } from "react";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
  onRetry: () => void;
}

function ErrorFallback({
  error,
  errorInfo,
  errorId,
  onRetry,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  const copyErrorDetails = () => {
    const errorDetails = {
      message: error?.message,
      stack: error?.stack,
      componentStack: errorInfo?.componentStack,
      errorId,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    };

    navigator.clipboard.writeText(JSON.stringify(errorDetails, null, 2));
    alert("Error details copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-lg font-medium text-gray-900">
              Oops! Something went wrong
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              We're sorry, but something unexpected happened. Our team has been
              notified.
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={onRetry}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <ArrowPathIcon className="w-4 h-4 mr-2" />
              Try Again
            </button>

            <button
              onClick={reloadPage}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Reload Page
            </button>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex justify-center py-2 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              {showDetails ? "Hide" : "Show"} Error Details
            </button>
          </div>

          {showDetails && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">
                  Error Details
                </h3>
                <button
                  onClick={copyErrorDetails}
                  className="text-xs text-primary-600 hover:text-primary-800"
                >
                  Copy Details
                </button>
              </div>

              <div className="space-y-2 text-xs text-gray-700">
                <div>
                  <span className="font-medium">Error ID:</span> {errorId}
                </div>
                {error?.message && (
                  <div>
                    <span className="font-medium">Message:</span>{" "}
                    {error.message}
                  </div>
                )}
                {error?.stack && (
                  <details className="mt-2">
                    <summary className="cursor-pointer font-medium">
                      Stack Trace
                    </summary>
                    <pre className="mt-1 text-xs overflow-auto bg-white p-2 rounded border">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ErrorFallback;
