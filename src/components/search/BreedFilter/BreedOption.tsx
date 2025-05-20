function BreedOption({
  breed,
  pendingBreeds,
  toggleBreed,
}: {
  breed: string;
  pendingBreeds: string[];
  toggleBreed: (breed: string) => void;
}) {
  return (
    <div className="flex items-center p-1 hover:bg-gray-50 rounded">
      <input
        id={`breed-${breed}`}
        type="checkbox"
        checked={pendingBreeds.includes(breed)}
        onChange={() => toggleBreed(breed)}
        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        onClick={(e) => e.stopPropagation()}
      />
      <label
        htmlFor={`breed-${breed}`}
        className="ml-2 block text-sm text-gray-700 truncate"
      >
        {breed}
      </label>
    </div>
  );
}

export default BreedOption;
