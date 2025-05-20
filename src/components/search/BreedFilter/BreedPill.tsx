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
        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </span>
  );
}

export default BreedPill;
