import { HeartIcon } from "@heroicons/react/24/solid";

interface FavoritesButtonProps {
  onClick: () => void;
  favoriteCount: number;
}

function FavoritesButton({ onClick, favoriteCount }: FavoritesButtonProps) {
  return (
    <div className="relative">
      <button
        onClick={onClick}
        className="p-2 rounded-full transition-colors"
        title="My Favorites"
      >
        <HeartIcon className="h-7 w-7 text-red-500" />
      </button>
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
          {favoriteCount > 9 ? "9+" : favoriteCount}
        </span>
      )}
    </div>
  );
}

export default FavoritesButton;