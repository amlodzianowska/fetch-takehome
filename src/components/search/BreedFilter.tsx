import FilterDropdown from "../ui/FilterDropdown";
import { useBreeds } from "../../hooks/useBreeds";
import { withErrorBoundary } from "../errorBoundary/withErrorBoundary";

interface BreedFilterProps {
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
}

function BreedFilterComponent({
  selectedBreeds,
  onBreedsChange,
}: BreedFilterProps) {
  const { breeds, loading, error } = useBreeds();

  const renderBreed = (breed: string) => breed;
  const getBreedKey = (breed: string) => breed;
  const filterBreeds = (breeds: string[], searchTerm: string) =>
    breeds.filter((breed) =>
      breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <FilterDropdown
      items={breeds}
      selectedItems={selectedBreeds}
      onSelectionChange={onBreedsChange}
      renderItem={renderBreed}
      getItemKey={getBreedKey}
      filterItems={filterBreeds}
      title="Filter by Breed"
      placeholder="Search breeds..."
      loading={loading}
      error={error}
    />
  );
}

const BreedFilter = withErrorBoundary(BreedFilterComponent, {
  fallback: (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-400">
        Filter by Breed
      </h3>
      <div className="text-center py-8">
        <p className="text-gray-500 text-sm">Filter temporarily unavailable</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-primary-600 text-sm hover:text-primary-800"
        >
          Refresh to try again
        </button>
      </div>
    </div>
  ),
  onError: (error) => {
    console.error("BreedFilter error:", error);
  },
});

export default BreedFilter;
