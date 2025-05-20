import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import dogService from "../services/dogService";
import type { Dog } from "../types";
import DogCard from "../components/sections/DogCard";

function SearchPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await dogService.searchDogs();

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
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Your New Best Friend
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
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
