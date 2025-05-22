import BreedFilter from "./BreedFilter";
import type { BreedFilterProps } from "./BreedFilter/types";

function SearchBar({ selectedBreeds, onBreedsChange }: BreedFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
          <BreedFilter
            selectedBreeds={selectedBreeds}
            onBreedsChange={onBreedsChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
