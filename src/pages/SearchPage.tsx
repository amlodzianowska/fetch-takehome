import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useSearch } from "../hooks/useSearch";
import PageLayout from "../components/layout/PageLayout";
import SearchControls from "../components/search/SearchControls";
import SearchResults from "../components/search/SearchResults";

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
    minAge,
    maxAge,
    setSelectedBreeds,
    setCurrentSort,
    setCurrentPageSize,
    setAgeRange,
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
    <PageLayout title="Find Your New Best Friend">
      <SearchControls
        selectedBreeds={selectedBreeds}
        onBreedsChange={setSelectedBreeds}
        minAge={minAge}
        maxAge={maxAge}
        onAgeChange={setAgeRange}
        currentSort={currentSort}
        onSortChange={setCurrentSort}
        currentPageSize={currentPageSize}
        onPageSizeChange={setCurrentPageSize}
        displayedCount={displayedDogs.length}
        totalCount={matchingDogCount}
        loading={loading}
      />

      <SearchResults
        dogs={displayedDogs}
        loading={loading}
        error={error}
        hasMore={hasMore}
        isLoadingMore={isLoadingMore}
        remainingCount={matchingDogCount - displayedDogs.length}
        onLoadMore={loadMoreDogs}
      />
    </PageLayout>
  );
}

export default SearchPage;
