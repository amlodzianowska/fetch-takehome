import type{ ReactNode } from "react";

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

function ModalFooter({ children, className = "" }: ModalFooterProps) {
  return <div className={`mt-4 text-center ${className}`}>{children}</div>;
}

export default ModalFooter;
