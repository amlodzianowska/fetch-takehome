import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../hooks/useSearch";
import DogCard from "../components/dogs/DogCard";
import Spinner from "../components/ui/Spinner";
import SearchBar from "../components/search/SearchBar";
import SortControls from "../components/search/SortControls";
import PageSizeSelector from "../components/search/PageSizeSelector";
import LoadMoreButton from "../components/search/LoadMoreButton";

function SearchPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const {
    displayedDogs,
    loading,
    error,
    isLoadingMore,
    hasMore,
    matchingDogCount,
    loadMoreDogs,
    selectedBreeds,
    currentSort,
    currentPageSize,
    setSelectedBreeds,
    setCurrentSort,
    setCurrentPageSize,
  } = useSearch({
    initialSize: 24,
    initialSort: "breed:asc",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Your New Best Friend
        </h1>

        <SearchBar
          selectedBreeds={selectedBreeds}
          onBreedsChange={setSelectedBreeds}
        />

        <div className="flex justify-between items-center mb-8">
          <SortControls
            currentSort={currentSort}
            onSortChange={setCurrentSort}
          />

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {loading
                ? "Loading..."
                : `Showing ${displayedDogs.length} of ${matchingDogCount} dogs`}
            </span>
            <PageSizeSelector
              currentPageSize={currentPageSize}
              onPageSizeChange={setCurrentPageSize}
              totalCount={matchingDogCount}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : displayedDogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              No dogs found. Please try again later.
            </div>
          )}
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <LoadMoreButton
              loadMoreDogs={loadMoreDogs}
              isLoadingMore={isLoadingMore}
              remainingDogs={matchingDogCount - displayedDogs.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
