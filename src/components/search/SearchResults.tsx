import DogGrid from "../dogs/DogGrid";
import LoadMoreButton from "./LoadMoreButton";
import type { Dog } from "../../types";

interface SearchResultsProps {
  dogs: Dog[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  isLoadingMore: boolean;
  remainingCount: number;
  onLoadMore: () => void;
}

function SearchResults({
  dogs,
  loading,
  error,
  hasMore,
  isLoadingMore,
  remainingCount,
  onLoadMore,
}: SearchResultsProps) {
  return (
    <>
      <DogGrid
        dogs={dogs}
        loading={loading}
        error={error}
        emptyMessage="No dogs found. Please try different filters."
        emptyAction={
          <p className="text-gray-400">
            Try adjusting your breed selection or age range to see more results.
          </p>
        }
      />

      {hasMore && !loading && (
        <div className="mt-12 text-center">
          <LoadMoreButton
            loadMoreDogs={onLoadMore}
            isLoadingMore={isLoadingMore}
            remainingDogs={remainingCount}
          />
        </div>
      )}
    </>
  );
}

export default SearchResults;
