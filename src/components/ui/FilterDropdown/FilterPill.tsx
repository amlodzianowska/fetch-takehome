import { XMarkIcon } from "@heroicons/react/20/solid";
import type { FilterPillProps } from "./types";

function FilterPill<T>({
  item,
  renderItem,
  getItemKey,
  onRemove,
}: FilterPillProps<T>) {
  const itemKey = getItemKey(item);
  const itemDisplay = renderItem(item);

  return (
    <span
      key={itemKey}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
    >
      {itemDisplay}
      <button
        type="button"
        className="ml-1.5 inline-flex text-primary-600 hover:text-primary-900"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(item);
        }}
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-3 w-3" />
      </button>
    </span>
  );
}

export default FilterPill;
