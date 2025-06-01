import { useEffect } from "react";

interface UseBodyScrollLockOptions {
  isActive: boolean;
}

export function useBodyScrollLock({
  isActive,
}: UseBodyScrollLockOptions): void {
  useEffect(() => {
    if (!isActive) return;

    const originalOverflowStyle = lockBodyScroll();
    return () => unlockBodyScroll(originalOverflowStyle);
  }, [isActive]);
}

function lockBodyScroll(): string {
  const originalStyle = window.getComputedStyle(document.body).overflow;
  const currentLocks = parseInt(document.body.dataset.scrollLocks || "0", 10);

  document.body.style.overflow = "hidden";
  document.body.dataset.scrollLocks = String(currentLocks + 1);

  return originalStyle;
}

function unlockBodyScroll(originalStyle: string): void {
  const locks = parseInt(document.body.dataset.scrollLocks || "0", 10);

  if (locks <= 1) {
    document.body.style.overflow = originalStyle;
    delete document.body.dataset.scrollLocks;
  } else {
    document.body.dataset.scrollLocks = String(locks - 1);
  }
}
