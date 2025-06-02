import { useCallback } from "react";

interface ErrorHandlerOptions {
  showToast?: boolean;
  logToConsole?: boolean;
  reportToService?: boolean;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const {
    showToast = true,
    logToConsole = true,
    reportToService = false,
  } = options;

  const handleError = useCallback(
    (error: Error | string, context?: string) => {
      const errorObj = typeof error === "string" ? new Error(error) : error;

      if (logToConsole) {
        console.error(`Error${context ? ` in ${context}` : ""}:`, errorObj);
      }

      if (showToast) {
        console.warn("Toast notification:", errorObj.message);
      }

      if (reportToService) {
        // Sentry.captureException(errorObj, { tags: { context } });
      }

      return errorObj;
    },
    [showToast, logToConsole, reportToService]
  );

  const handleAsyncError = useCallback(
    async <T>(asyncFn: () => Promise<T>, context?: string): Promise<T> => {
      try {
        return await asyncFn();
      } catch (error) {
        handleError(error as Error, context);
        throw error;
      }
    },
    [handleError]
  );

  return { handleError, handleAsyncError };
}
