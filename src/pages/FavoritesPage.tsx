import DogGrid from "../components/dogs/DogGrid";
import PageLayout from "../components/layout/PageLayout";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router-dom";

function FavoritesPage() {
  const { favoriteDogs, clearFavorites } = useFavorites();
  const navigate = useNavigate();

  const emptyAction = (
    <>
      <p className="text-gray-400 mb-4">
        Start browsing and click the heart icon on dogs you like!
      </p>
      <button
        onClick={() => navigate("/search")}
        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
      >
        Browse Dogs
      </button>
    </>
  );

  const clearAllButton = favoriteDogs.length > 0 && (
    <button
      onClick={clearFavorites}
      className="text-sm text-red-600 hover:text-red-800 underline"
    >
      Clear all favorites
    </button>
  );

  return (
    <PageLayout
      title={`My Favorite Dogs (${favoriteDogs.length})`}
      actions={clearAllButton}
    >
      <DogGrid
        dogs={favoriteDogs}
        emptyMessage="No favorite dogs yet"
        emptyAction={emptyAction}
      />
    </PageLayout>
  );
}

export default FavoritesPage;
