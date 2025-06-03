import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { withErrorBoundary } from "../errorBoundary/withErrorBoundary";

interface HeartButtonProps {
  dogId: string;
  isLiked: boolean;
  onToggleLike: () => void;
}

function HeartButtonComponent({
  dogId,
  isLiked,
  onToggleLike,
}: HeartButtonProps) {
  return (
    <button
      onClick={onToggleLike}
      className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-all duration-200 hover:scale-110"
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
    >
      {isLiked ? (
        <HeartSolid className="w-5 h-5 text-red-500" />
      ) : (
        <HeartOutline className="w-5 h-5 text-gray-600 hover:text-red-500" />
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
