import BreedFilter from "./BreedFilter";
import AgeSlider from "./AgeSlider";
import type { BreedFilterProps } from "./BreedFilter/types";

interface SearchBarProps extends BreedFilterProps {
  minAge: number;
  maxAge: number;
  onAgeChange: (minAge: number, maxAge: number) => void;
}

function SearchBar({
  selectedBreeds,
  onBreedsChange,
  minAge,
  maxAge,
  onAgeChange,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md mb-6">
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BreedFilter
            selectedBreeds={selectedBreeds}
            onBreedsChange={onBreedsChange}
          />
          <AgeSlider
            minAge={minAge}
            maxAge={maxAge}
            onAgeChange={onAgeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
