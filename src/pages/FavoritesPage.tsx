import DogCard from "../components/dogs/DogCard";
import { useFavorites } from "../contexts/FavoritesContext";

function FavoritesPage() {
  const { favoriteDogs, clearFavorites } = useFavorites();

  if (favoriteDogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            My Favorite Dogs
          </h1>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-500 text-lg mb-4">
              No favorite dogs yet
            </div>
            <p className="text-gray-400">
              Start browsing and click the heart icon on dogs you like!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            My Favorite Dogs ({favoriteDogs.length})
          </h1>
          <button
            onClick={clearFavorites}
            className="text-sm text-red-600 hover:text-red-800 underline"
          >
            Clear all favorites
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
