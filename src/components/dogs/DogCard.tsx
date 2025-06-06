import type { Dog } from "../../types";
import Card from "../ui/Card";
import { useFavorites } from "../../contexts/FavoritesContext";
import HeartButton from "../ui/HeartButton";
import { withErrorBoundary } from "../errorBoundary/withErrorBoundary";

interface DogCardProps {
  dog: Dog;
}

function DogCardComponent({ dog }: DogCardProps) {
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleToggleLike = () => {
    toggleFavorite(dog);
  };

  return (
    <Card className="relative overflow-hidden">
      <img src={dog.img} alt={dog.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{dog.name}</h3>
        <p className="text-gray-600 mb-2">
          {dog.breed} • {dog.age} {dog.age === 1 ? "year" : "years"} old
        </p>
        <p className="text-gray-500 text-sm mb-2">Location: {dog.zip_code}</p>
      </div>

      <HeartButton
        dogId={dog.id}
        isLiked={isFavorite(dog.id)}
        onToggleLike={handleToggleLike}
      />
    </Card>
  );
}

const DogCard = withErrorBoundary(DogCardComponent, {
  fallback: (
    <Card className="relative overflow-hidden">
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <svg
            className="w-8 h-8 mx-auto mb-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.694-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <p className="text-sm">Unable to load</p>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1 text-gray-400">
          Dog information unavailable
        </h3>
        <p className="text-gray-400 mb-2">Please try refreshing the page</p>
      </div>
    </Card>
  ),
  onError: (error, errorInfo) => {
    console.error("DogCard error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  },
});

export default DogCard;
