import type { FilterOptionProps } from "./types";

function FilterOption<T>({
  item,
  isSelected,
  renderItem,
  getItemKey,
  onToggle,
}: FilterOptionProps<T>) {
  const itemKey = getItemKey(item);
  const itemDisplay = renderItem(item);

  return (
    <div className="flex items-center p-1 hover:bg-gray-50 rounded">
      <input
        id={`filter-${itemKey}`}
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(item)}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        onClick={(e) => e.stopPropagation()}
      />
      <label
        htmlFor={`filter-${itemKey}`}
        className="ml-2 block text-sm text-gray-700 truncate"
      >
        {itemDisplay}
      </label>
    </div>
  );
}

export default FilterOption;
