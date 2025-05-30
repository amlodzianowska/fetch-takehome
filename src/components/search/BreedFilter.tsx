import FilterDropdown from "../ui/FilterDropdown";
import { useBreeds } from "../../hooks/useBreeds";

interface BreedFilterProps {
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
}

function BreedFilter({ selectedBreeds, onBreedsChange }: BreedFilterProps) {
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

export default BreedFilter;
