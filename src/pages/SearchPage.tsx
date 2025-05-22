import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import dogService from "../services/dogService";
import type { DogSearchParams } from "../services/dogService";
import type { Dog } from "../types";
import DogCard from "../components/sections/DogCard";
import Spinner from "../components/common/Spinner";
import BreedFilter from "../components/search/BreedFilter";
import SortControls from "../components/search/SortControls";

function SearchPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<string>("breed:asc");

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchParams: DogSearchParams = {
          size: 100,
          sort: currentSort, // Include sort parameter
        };

        if (selectedBreeds.length > 0) {
          searchParams.breeds = selectedBreeds;
        }

        const results = await dogService.searchDogs(searchParams);

        if (results.resultIds.length > 0) {
          const dogsData = await dogService.getDogsByIds(results.resultIds);
          setDogs(dogsData);
        } else {
          setDogs([]);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setError("Failed to fetch dogs. Please try again.");
        setDogs([]);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchDogs();
    }
  }, [isLoggedIn, selectedBreeds, currentSort]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleBreedsChange = (breeds: string[]) => {
    setSelectedBreeds(breeds);
  };

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Your New Best Friend
        </h1>

        <div className="flex flex-col md:flex-row mb-8">
          <div className="w-full md:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <BreedFilter
                selectedBreeds={selectedBreeds}
                onBreedsChange={handleBreedsChange}
              />
            </div>
          </div>
        </div>

        <SortControls
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : dogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              No dogs found. Please try again later.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
