import FilterPill from "./FilterPill";
import type { SelectedItemsProps } from "./types";

function SelectedItems<T>({
  pendingItems,
  renderItem,
  getItemKey,
  toggleItem,
  clearAll,
}: SelectedItemsProps<T>) {
  if (pendingItems.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">
          Selected ({pendingItems.length}):
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
        {pendingItems.map((item) => (
          <FilterPill
            key={getItemKey(item)}
            item={item}
            renderItem={renderItem}
            getItemKey={getItemKey}
            onRemove={toggleItem}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectedItems;
