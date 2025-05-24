import { useEffect } from "react";
import LoginForm from "./LoginForm";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 overflow-hidden transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
          type="button"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="px-6 pt-6 pb-8">
          <div className="text-center mb-6">
            <img
              className="mx-auto h-16 w-auto"
              src="/favicon.ico"
              alt="PetStop Logo"
            />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Welcome to PetStop
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to find your perfect furry companion
            </p>
          </div>

          <LoginForm onSuccess={onSuccess} />

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By signing in, you'll be able to search and find your perfect pet
              match
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
