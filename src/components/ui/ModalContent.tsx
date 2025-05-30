import type { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalContentProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  iconAlt?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
  children: ReactNode;
  headerClassName?: string;
  contentClassName?: string;
}

function ModalContent({
  title,
  subtitle,
  icon,
  iconAlt = "Logo",
  showCloseButton = true,
  onClose,
  children,
  headerClassName = "",
  contentClassName = "",
}: ModalContentProps) {
  return (
    <>
      {showCloseButton && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
          type="button"
          aria-label="Close modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )}

      {(title || subtitle || icon) && (
        <div className={`text-center mb-6 pt-6 px-6 ${headerClassName}`}>
          {icon && (
            <img
              className="mx-auto h-16 w-auto mb-4"
              src={icon}
              alt={iconAlt}
            />
          )}
          {title && (
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          )}
          {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
        </div>
      )}

      <div className={`px-6 pb-8 ${contentClassName}`}>{children}</div>
    </>
  );
}

export default ModalContent;
