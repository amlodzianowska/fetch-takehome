import BreedOption from "./BreedOption";
import type { BreedListProps } from "./types";

function BreedList({
  loading,
  error,
  filteredBreeds,
  pendingBreeds,
  toggleBreed,
}: BreedListProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  return (
    <div className="max-h-64 overflow-y-auto pr-2 border border-gray-200 rounded-md">
      {filteredBreeds.length === 0 ? (
        <p className="text-gray-500 text-sm py-4 px-3">No breeds found</p>
      ) : (
        <div className="p-2 space-y-1">
          {filteredBreeds.map((breed) => (
            <BreedOption
              key={breed}
              breed={breed}
              pendingBreeds={pendingBreeds}
              toggleBreed={toggleBreed}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default BreedList;
