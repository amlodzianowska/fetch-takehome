import SearchBar from "./SearchBar";
import SortControls from "./SortControls";
import PageSizeSelector from "./PageSizeSelector";

interface SearchControlsProps {
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
  minAge: number;
  maxAge: number;
  onAgeChange: (minAge: number, maxAge: number) => void;

  currentSort: string;
  onSortChange: (sort: string) => void;
  currentPageSize: number;
  onPageSizeChange: (size: number) => void;

  displayedCount: number;
  totalCount: number;
  loading: boolean;
}

function SearchControls({
  selectedBreeds,
  onBreedsChange,
  minAge,
  maxAge,
  onAgeChange,
  currentSort,
  onSortChange,
  currentPageSize,
  onPageSizeChange,
  displayedCount,
  totalCount,
  loading,
}: SearchControlsProps) {
  return (
    <>
      <SearchBar
        selectedBreeds={selectedBreeds}
        onBreedsChange={onBreedsChange}
        minAge={minAge}
        maxAge={maxAge}
        onAgeChange={onAgeChange}
      />

      <div className="flex justify-between items-center mb-8">
        <SortControls currentSort={currentSort} onSortChange={onSortChange} />

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {loading
              ? "Loading..."
              : `Showing ${displayedCount} of ${totalCount} dogs`}
          </span>
          <PageSizeSelector
            currentPageSize={currentPageSize}
            onPageSizeChange={onPageSizeChange}
            totalCount={totalCount}
          />
        </div>
      </div>
    </>
  );
}

export default SearchControls;
