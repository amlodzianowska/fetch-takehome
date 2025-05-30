export interface FilterDropdownProps<T> {
  items: T[];
  selectedItems: T[];
  onSelectionChange: (items: T[]) => void;
  renderItem: (item: T) => string;
  getItemKey: (item: T) => string;
  filterItems: (items: T[], searchTerm: string) => T[];
  title: string;
  placeholder?: string;
  loading?: boolean;
  error?: string | null;
  disabled?: boolean;
  className?: string;
}

export interface FilterHeaderProps {
  title: string;
  count: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export interface FilterListProps<T> {
  loading: boolean;
  error: string | null;
  filteredItems: T[];
  pendingItems: T[];
  renderItem: (item: T) => string;
  getItemKey: (item: T) => string;
  toggleItem: (item: T) => void;
}

export interface FilterOptionProps<T> {
  item: T;
  isSelected: boolean;
  renderItem: (item: T) => string;
  getItemKey: (item: T) => string;
  onToggle: (item: T) => void;
}

export interface FilterPillProps<T> {
  item: T;
  renderItem: (item: T) => string;
  getItemKey: (item: T) => string;
  onRemove: (item: T) => void;
}

export interface SelectedItemsProps<T> {
  pendingItems: T[];
  renderItem: (item: T) => string;
  getItemKey: (item: T) => string;
  toggleItem: (item: T) => void;
  clearAll: () => void;
}

export interface ActionButtonsProps {
  hasChanges: boolean;
  onCancel: () => void;
  onApply: () => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
