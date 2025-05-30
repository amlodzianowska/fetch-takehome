import DogCard from "./DogCard";
import Spinner from "../ui/Spinner";
import type { Dog } from "../../types";

interface DogGridProps {
  dogs: Dog[];
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  emptyAction?: React.ReactNode;
  className?: string;
  gridCols?: "1" | "2" | "3" | "4";
}

function DogGrid({
  dogs,
  loading = false,
  error = null,
  emptyMessage = "No dogs found",
  emptyAction,
  className = "",
  gridCols = "4",
}: DogGridProps) {
  const gridClass = {
    "1": "grid-cols-1",
    "2": "grid-cols-1 sm:grid-cols-2",
    "3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[gridCols];

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="text-center text-red-500 p-4">{error}</div>
      </div>
    );
  }

  if (dogs.length === 0) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-12 text-center ${className}`}
      >
        <div className="text-gray-500 text-lg mb-4">{emptyMessage}</div>
        {emptyAction}
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className={`grid ${gridClass} gap-6`}>
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>
    </div>
  );
}

export default DogGrid;