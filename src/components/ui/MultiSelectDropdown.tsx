import { useState, useEffect, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import SearchInput from "../search/SearchInput";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface MultiSelectDropdownProps<T> {
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
  dropdownWidth?: string;
  maxHeight?: string;

  confirmOnClose?: boolean;
  showSearch?: boolean;
  showSelectAll?: boolean;
}

function MultiSelectDropdown<T>({
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
  dropdownWidth = "w-80 min-w-80",
  maxHeight = "max-h-64",
  confirmOnClose = true,
  showSearch = true,
  showSelectAll = false,
}: MultiSelectDropdownProps<T>) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pendingItems, setPendingItems] = useState<T[]>(selectedItems);
  const [hasChanges, setHasChanges] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPendingItems(selectedItems);
    setHasChanges(false);
  }, [selectedItems]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const filteredItems = showSearch ? filterItems(items, searchTerm) : items;

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

  const selectAll = () => {
    setPendingItems([...filteredItems]);
    setHasChanges(true);
  };

  const clearAll = () => {
    setPendingItems([]);
    setHasChanges(true);
  };

  const applyChanges = () => {
    onSelectionChange(pendingItems);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const cancelChanges = () => {
    setPendingItems(selectedItems);
    setHasChanges(false);
    setIsExpanded(false);
  };

  const handleClose = () => {
    if (!isExpanded) return;

    if (confirmOnClose && hasChanges) {
      const wantToApply = window.confirm(
        "Do you want to apply your selections?"
      );
      if (wantToApply) {
        applyChanges();
      } else {
        cancelChanges();
      }
    } else {
      setIsExpanded(false);
    }
  };

  const toggleDropdown = () => {
    if (disabled) return;

    if (isExpanded) {
      handleClose();
    } else {
      setIsExpanded(true);
      setSearchTerm("");
    }
  };

  const isItemSelected = (item: T) => {
    const itemKey = getItemKey(item);
    return pendingItems.some((selected) => getItemKey(selected) === itemKey);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Header */}
      <div
        className={`flex justify-between items-center cursor-pointer p-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={toggleDropdown}
      >
        <h3 className="font-semibold text-gray-700">{title}</h3>
        <div className="flex items-center">
          {selectedItems.length > 0 && (
            <span className="text-sm bg-primary-100 text-primary-800 py-0.5 px-2 rounded-full mr-2">
              {selectedItems.length}
            </span>
          )}
          <ChevronDownIcon
            className={`h-5 w-5 text-gray-500 transition-transform ${
              isExpanded ? "transform rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Dropdown Content */}
      {isExpanded && (
        <div
          className={`absolute z-30 mt-2 bg-white rounded-md shadow-lg border ${dropdownWidth}`}
        >
          <div className="p-3">
            {/* Search Input */}
            {showSearch && (
              <div className="mb-3">
                <SearchInput
                  value={searchTerm}
                  onChange={setSearchTerm}
                  placeholder={placeholder}
                />
              </div>
            )}

            {/* Select All / Clear All */}
            {showSelectAll && filteredItems.length > 0 && (
              <div className="mb-3 flex justify-between text-sm">
                <button
                  onClick={selectAll}
                  className="text-primary-600 hover:text-primary-800"
                >
                  Select All ({filteredItems.length})
                </button>
                <button
                  onClick={clearAll}
                  className="text-red-600 hover:text-red-800"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Items List */}
            <div
              className={`overflow-y-auto pr-2 border border-gray-200 rounded-md ${maxHeight}`}
            >
              {loading ? (
                <div className="flex justify-center py-4">
                  <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
                </div>
              ) : error ? (
                <div className="text-red-500 text-sm p-4">{error}</div>
              ) : filteredItems.length === 0 ? (
                <p className="text-gray-500 text-sm py-4 px-3">
                  {searchTerm
                    ? `No items found for "${searchTerm}"`
                    : "No items available"}
                </p>
              ) : (
                <div className="p-2 space-y-1">
                  {filteredItems.map((item) => (
                    <div
                      key={getItemKey(item)}
                      className="flex items-center p-1 hover:bg-gray-50 rounded"
                    >
                      <input
                        id={`item-${getItemKey(item)}`}
                        type="checkbox"
                        checked={isItemSelected(item)}
                        onChange={() => toggleItem(item)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <label
                        htmlFor={`item-${getItemKey(item)}`}
                        className="ml-2 block text-sm text-gray-700 truncate cursor-pointer"
                      >
                        {renderItem(item)}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Items Display */}
            {pendingItems.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-700">
                    Selected ({pendingItems.length}):
                  </h4>
                  <button
                    onClick={clearAll}
                    className="text-xs text-primary-600 hover:text-primary-800"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {pendingItems.map((item) => (
                    <span
                      key={getItemKey(item)}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {renderItem(item)}
                      <button
                        type="button"
                        className="ml-1.5 inline-flex text-primary-600 hover:text-primary-900"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItem(item);
                        }}
                      >
                        <span className="sr-only">Remove</span>
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {confirmOnClose && hasChanges && (
              <div className="mt-4 flex justify-end space-x-2">
                <button
                  onClick={cancelChanges}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={applyChanges}
                  className="px-3 py-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm rounded-md shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiSelectDropdown;
