import { XMarkIcon } from "@heroicons/react/20/solid";

function BreedPill({
  breed,
  toggleBreed,
}: {
  breed: string;
  toggleBreed: (breed: string) => void;
}) {
  return (
    <span
      key={breed}
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
    >
      {breed}
      <button
        type="button"
        className="ml-1.5 inline-flex text-primary-600 hover:text-primary-900"
        onClick={(e) => {
          e.stopPropagation();
          toggleBreed(breed);
        }}
      >
        <span className="sr-only">Remove</span>
        <XMarkIcon className="h-3 w-3" />
      </button>
    </span>
  );
}

export default BreedPill;
