import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface PageSizeSelectorProps {
  currentPageSize: number;
  onPageSizeChange: (size: number) => void;
  totalCount: number;
}

const PAGE_SIZE_OPTIONS = [
  { value: 12, label: "12 per page" },
  { value: 24, label: "24 per page" },
  { value: 48, label: "48 per page" },
  { value: 96, label: "96 per page" },
];

function PageSizeSelector({
  currentPageSize,
  onPageSizeChange,
  totalCount,
}: PageSizeSelectorProps) {
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
    const option = PAGE_SIZE_OPTIONS.find(
      (opt) => opt.value === currentPageSize
    );
    return option ? option.label : `${currentPageSize} per page`;
  };

  const handleOptionClick = (value: number) => {
    onPageSizeChange(value);
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
          inline-flex items-center px-3 py-2 rounded-md border text-sm font-medium
          transition-all duration-200 min-w-0
          ${
            isOpen
              ? "border-primary-500 bg-primary-50 text-primary-700 shadow-sm"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50"
          }
        `}
      >
        <span className="mr-2 truncate">{getCurrentLabel()}</span>
        <ChevronDownIcon
          className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50">
          <div className="py-1">
            <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
              Show
            </div>
            {PAGE_SIZE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                disabled={option.value > totalCount && totalCount > 0}
                className={`
                  w-full text-left px-3 py-2 text-sm transition-colors duration-150
                  ${
                    currentPageSize === option.value
                      ? "bg-primary-50 text-primary-700 font-medium"
                      : option.value > totalCount && totalCount > 0
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-50"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span>{option.label}</span>
                  {currentPageSize === option.value && (
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  )}
                  {option.value > totalCount && totalCount > 0 && (
                    <span className="text-xs text-gray-400">
                      (only {totalCount})
                    </span>
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

export default PageSizeSelector;
