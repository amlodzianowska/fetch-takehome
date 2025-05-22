import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface SortControlsProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = [
  { value: "breed:asc", label: "Breed (A-Z)" },
  { value: "breed:desc", label: "Breed (Z-A)" },
  { value: "name:asc", label: "Name (A-Z)" },
  { value: "name:desc", label: "Name (Z-A)" },
  { value: "age:asc", label: "Age (Youngest)" },
  { value: "age:desc", label: "Age (Oldest)" },
];

function SortControls({ currentSort, onSortChange }: SortControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCurrentLabel = () => {
    const option = SORT_OPTIONS.find((opt) => opt.value === currentSort);
    return option ? option.label : "Sort by";
  };

  const handleOptionClick = (value: string) => {
    onSortChange(value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={`
          inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium
          transition-all duration-200 min-w-0
          ${
            isOpen
              ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }
        `}
      >
        <span className="mr-2 truncate">Sort by: {getCurrentLabel()}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="py-2">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Sort Options
            </div>
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className={`
                  w-full text-left px-4 py-3 text-sm transition-colors duration-150
                  ${
                    currentSort === option.value
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {currentSort === option.value && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SortControls;
