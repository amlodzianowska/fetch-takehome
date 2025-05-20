import { useState, useEffect } from "react";
import dogService from "../../services/dogService";

interface BreedFilterProps {
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
}

function BreedOption({
  breed,
  pendingBreeds,
  toggleBreed,
}: {
  breed: string;
  pendingBreeds: string[];
  toggleBreed: (breed: string) => void;
}) {
  return (
    <div className="flex items-center p-1 hover:bg-gray-50 rounded">
      <input
        id={`breed-${breed}`}
        type="checkbox"
        checked={pendingBreeds.includes(breed)}
        onChange={() => toggleBreed(breed)}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        onClick={(e) => e.stopPropagation()}
      />
      <label
        htmlFor={`breed-${breed}`}
        className="ml-2 block text-sm text-gray-700 truncate"
      >
        {breed}
      </label>
    </div>
  );
}

function PendingBreedPill({
  breed,
  toggleBreed,
}: {
  breed: string;
  toggleBreed: (breed: string) => void;
}) {
  return (
    <span
      key={breed}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
    >
      {breed}
      <button
        type="button"
        className="ml-1.5 inline-flex text-primary-600 hover:text-primary-900"
        onClick={(e) => {
          e.stopPropagation();
          toggleBreed(breed);
        }}
      >
        <span className="sr-only">Remove</span>
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </span>
  );
}

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
      <div
        className={`flex justify-between items-center cursor-pointer`}
        onClick={toggleDropdown}
      >
        <h3 className="font-semibold text-gray-700">Filter by Breed</h3>
        <div className="flex items-center">
          {selectedBreeds.length > 0 && (
            <span className="text-sm bg-primary-100 text-primary-800 py-0.5 px-2 rounded-full mr-2">
              {selectedBreeds.length}
            </span>
          )}
          <svg
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isExpanded ? "transform rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {isExpanded && (
        <>
          <div className="absolute z-30 mt-2 bg-white rounded-md shadow-lg border ">
            <div className="p-3">
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search breeds..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-sm">{error}</div>
              ) : (
                <div className="max-h-64 overflow-y-auto pr-2 border border-gray-200 rounded-md">
                  {filteredBreeds.length === 0 ? (
                    <p className="text-gray-500 text-sm py-4 px-3">
                      No breeds found
                    </p>
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
              )}

              {pendingBreeds.length > 0 && (
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
                      <PendingBreedPill
                        key={breed}
                        breed={breed}
                        toggleBreed={toggleBreed}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex justify-end space-x-2">
                {hasChanges && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelChanges();
                      }}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        applyFilters();
                      }}
                      className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-md shadow-sm"
                    >
                      Apply Filters
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BreedFilter;
