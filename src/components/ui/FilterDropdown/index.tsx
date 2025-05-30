import { useState, useEffect } from "react";
import SearchInput from "./SearchInput";
import FilterHeader from "./FilterHeader";
import ActionButtons from "./ActionButtons";
import SelectedItems from "./SelectedItems";
import FilterList from "./FilterList";
import type { FilterDropdownProps } from "./types";

function FilterDropdown<T>({
  items,
  selectedItems,
  onSelectionChange,
  renderItem,
  getItemKey,
  filterItems,
  title,
  placeholder = "Search...",
  loading = false,
  error = null,
  disabled = false,
  className = "",
}: FilterDropdownProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [pendingItems, setPendingItems] = useState<T[]>(selectedItems);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setPendingItems(selectedItems);
    setHasChanges(false);
  }, [selectedItems]);

  const filteredItems = searchTerm ? filterItems(items, searchTerm) : items;

  const toggleItem = (item: T) => {
    const itemKey = getItemKey(item);
    const isSelected = pendingItems.some(
      (selected) => getItemKey(selected) === itemKey
    );

    const newPendingItems = isSelected
      ? pendingItems.filter((selected) => getItemKey(selected) !== itemKey)
      : [...pendingItems, item];

    setPendingItems(newPendingItems);
    setHasChanges(true);
  };

  const applyFilters = () => {
    onSelectionChange(pendingItems);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const cancelChanges = () => {
    setPendingItems(selectedItems);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const clearAll = () => {
    setPendingItems([]);
    setHasChanges(true);
  };

  const toggleDropdown = () => {
    if (disabled) return;

    if (isExpanded && hasChanges) {
      const wantToApply = window.confirm(
        "Do you want to apply your selections?"
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
    <div className={`relative ${className}`}>
      <FilterHeader
        title={title}
        count={selectedItems.length}
        isExpanded={isExpanded}
        onToggle={toggleDropdown}
      />

      {isExpanded && (
        <div className="absolute z-30 mt-2 bg-white rounded-md shadow-lg border w-80 min-w-80">
          <div className="p-3">
            <div className="mb-3">
              <SearchInput
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={placeholder}
              />
            </div>

            <FilterList
              loading={loading}
              error={error}
              filteredItems={filteredItems}
              pendingItems={pendingItems}
              renderItem={renderItem}
              getItemKey={getItemKey}
              toggleItem={toggleItem}
            />

            <SelectedItems
              pendingItems={pendingItems}
              renderItem={renderItem}
              getItemKey={getItemKey}
              toggleItem={toggleItem}
              clearAll={clearAll}
            />

            <ActionButtons
              hasChanges={hasChanges}
              onCancel={cancelChanges}
              onApply={applyFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterDropdown;
