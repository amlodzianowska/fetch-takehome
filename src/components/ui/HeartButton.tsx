import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { HEART_ANIMATION_DURATION } from "../../constants";
import { withErrorBoundary } from "../errorBoundary/withErrorBoundary";

interface HeartButtonProps {
  dogId: string;
  isLiked: boolean;
  onToggleLike: (dogId: string) => void;
}

function HeartButtonComponent({
  dogId,
  isLiked,
  onToggleLike,
}: HeartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAnimating(true);

    onToggleLike(dogId);

    setTimeout(() => {
      setIsAnimating(false);
    }, HEART_ANIMATION_DURATION);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute bottom-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm 
        hover:bg-white/90 transition-all duration-200
        ${isAnimating ? "scale-125" : "scale-100"}
        transform hover:scale-110
      `}
    >
      {isLiked ? (
        <HeartSolidIcon className="h-5 w-5 text-red-500" />
      ) : (
        <HeartIcon className="h-5 w-5 text-gray-500 hover:text-red-400" />
      )}
    </button>
  );
}

const HeartButton = withErrorBoundary(HeartButtonComponent, {
  fallback: (
    <div className="absolute top-2 right-2 p-2">
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
    </div>
  ),
  onError: (error) => {
    console.error("HeartButton error:", error);
  },
});

export default HeartButton;
