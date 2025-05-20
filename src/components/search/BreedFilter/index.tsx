import { useState, useEffect } from "react";
import dogService from "../../../services/dogService";
import type { BreedFilterProps } from "./types";
import SearchInput from "./SearchInput";
import FilterHeader from "./FilterHeader";
import ActionButtons from "./ActionButtons";
import SelectedBreeds from "./SelectedBreeds";
import BreedList from "./BreedList";

function BreedFilter({ selectedBreeds, onBreedsChange }: BreedFilterProps) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [pendingBreeds, setPendingBreeds] = useState<string[]>(selectedBreeds);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      setError(null);

      try {
        const breedList = await dogService.getBreeds();
        setBreeds(breedList.sort()); // Sort alphabetically
      } catch (err) {
        console.error("Error fetching breeds:", err);
        setError("Failed to load breeds");
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  useEffect(() => {
    setPendingBreeds(selectedBreeds);
    setHasChanges(false);
  }, [selectedBreeds]);

  const filteredBreeds = searchTerm
    ? breeds.filter((breed) =>
        breed.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : breeds;

  const toggleBreed = (breed: string) => {
    const newPendingBreeds = pendingBreeds.includes(breed)
      ? pendingBreeds.filter((b) => b !== breed)
      : [...pendingBreeds, breed];

    setPendingBreeds(newPendingBreeds);
    setHasChanges(true);
  };

  const applyFilters = () => {
    onBreedsChange(pendingBreeds);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const cancelChanges = () => {
    setPendingBreeds(selectedBreeds);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const clearAll = () => {
    setPendingBreeds([]);
    setHasChanges(true);
  };

  const toggleDropdown = () => {
    if (isExpanded && hasChanges) {
      const wantToApply = window.confirm(
        "Do you want to apply your breed selections?"
      );
      if (wantToApply) {
        applyFilters();
      } else {
        cancelChanges();
      }
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative">
      <FilterHeader
        title="Filter by Breed"
        count={selectedBreeds.length}
        isExpanded={isExpanded}
        onToggle={toggleDropdown}
      />

      {isExpanded && (
        <>
          <div className="absolute z-30 mt-2 bg-white rounded-md shadow-lg border ">
            <div className="p-3">
              <div className="mb-3">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder="Search breeds..."
                />
              </div>

              <BreedList
                loading={loading}
                error={error}
                filteredBreeds={filteredBreeds}
                pendingBreeds={pendingBreeds}
                toggleBreed={toggleBreed}
              />

              <SelectedBreeds
                pendingBreeds={pendingBreeds}
                toggleBreed={toggleBreed}
                clearAll={clearAll}
              />

              <ActionButtons
                hasChanges={hasChanges}
                onCancel={cancelChanges}
                onApply={applyFilters}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BreedFilter;
