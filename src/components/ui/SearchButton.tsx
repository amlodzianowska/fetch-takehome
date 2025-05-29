import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchButtonProps {
  onClick: () => void;
}

function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full transition-colors"
      title="Search Dogs"
    >
      <MagnifyingGlassIcon className="h-6 w-6 text-primary-500 hover:text-primary-300" />
    </button>
  );
}

export default SearchButton;
