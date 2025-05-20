export interface BreedFilterProps {
  selectedBreeds: string[];
  onBreedsChange: (breeds: string[]) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface FilterHeaderProps {
  title: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface ActionButtonsProps {
  hasChanges: boolean;
  onCancel: (e: React.MouseEvent) => void;
  onApply: (e: React.MouseEvent) => void;
}

export interface SelectedBreedsProps {
  pendingBreeds: string[];
  toggleBreed: (breed: string) => void;
  clearAll: () => void;
}

export interface BreedListProps {
  loading: boolean;
  error: string | null;
  filteredBreeds: string[];
  pendingBreeds: string[];
  toggleBreed: (breed: string) => void;
}
