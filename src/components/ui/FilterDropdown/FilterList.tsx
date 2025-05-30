import FilterOption from "./FilterOption";
import type { FilterListProps } from "./types";

function FilterList<T>({
  loading,
  error,
  filteredItems,
  pendingItems,
  renderItem,
  getItemKey,
  toggleItem,
}: FilterListProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin h-5 w-5 border-2 border-primary-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm">{error}</div>;
  }

  const isItemSelected = (item: T) => {
    const itemKey = getItemKey(item);
    return pendingItems.some((selected) => getItemKey(selected) === itemKey);
  };

  return (
    <div className="max-h-64 overflow-y-auto pr-2 border border-gray-200 rounded-md">
      {filteredItems.length === 0 ? (
        <p className="text-gray-500 text-sm py-4 px-3">No items found</p>
      ) : (
        <div className="p-2 space-y-1">
          {filteredItems.map((item) => (
            <FilterOption
              key={getItemKey(item)}
              item={item}
              isSelected={isItemSelected(item)}
              renderItem={renderItem}
              getItemKey={getItemKey}
              onToggle={toggleItem}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilterList;
