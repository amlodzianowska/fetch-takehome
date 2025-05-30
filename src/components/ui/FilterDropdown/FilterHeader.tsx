import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FilterHeaderProps } from "./types";

function FilterHeader({
  title,
  count,
  isExpanded,
  onToggle,
}: FilterHeaderProps) {
  return (
    <div
      className="flex justify-between items-center cursor-pointer p-4 border border-gray-200 bg-white hover:bg-gray-50 transition-colors duration-200"
      onClick={onToggle}
    >
      <h3 className="font-semibold text-gray-700">{title}</h3>
      <div className="flex items-center">
        {count > 0 && (
          <span className="text-sm bg-primary-100 text-primary-800 py-0.5 px-2 rounded-full mr-2">
            {count}
          </span>
        )}
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-500 transition-transform ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}

export default FilterHeader;
