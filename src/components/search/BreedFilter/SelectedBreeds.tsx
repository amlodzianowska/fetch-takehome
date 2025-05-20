import BreedPill from "./BreedPill";
import type { SelectedBreedsProps } from "./types";

function SelectedBreeds({
  pendingBreeds,
  toggleBreed,
  clearAll,
}: SelectedBreedsProps) {
  if (pendingBreeds.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">
          Selected ({pendingBreeds.length}):
        </h4>
        <button
          onClick={(e) => {
            e.stopPropagation();
            clearAll();
          }}
          className="text-xs text-primary-600 hover:text-primary-800"
        >
          Clear All
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {pendingBreeds.map((breed) => (
          <BreedPill key={breed} breed={breed} toggleBreed={toggleBreed} />
        ))}
      </div>
    </div>
  );
}

export default SelectedBreeds;
