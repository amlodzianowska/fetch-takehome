import { PlusIcon } from "@heroicons/react/24/outline";

interface LoadMoreButtonProps {
  loadMoreDogs: () => void;
  isLoadingMore: boolean;
  remainingDogs: number;
}

function LoadMoreButton({
  loadMoreDogs,
  isLoadingMore,
  remainingDogs,
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={loadMoreDogs}
      disabled={isLoadingMore}
      className={`
                  inline-flex items-center px-8 py-4 border border-transparent 
                  text-base font-medium rounded-lg shadow-sm text-white 
                  transition-all duration-200 hover:shadow-lg
                  ${
                    isLoadingMore
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transform hover:scale-105"
                  }
                `}
    >
      {isLoadingMore ? (
        <>
          <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
          Loading More Dogs...
        </>
      ) : (
        <>
          <PlusIcon className="mr-2 h-5 w-5" />
          Load More Dogs ({remainingDogs} remaining)
        </>
      )}
    </button>
  );
}

export default LoadMoreButton;
