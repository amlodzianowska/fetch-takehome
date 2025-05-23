import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import dogService from "../services/dogService";
import type { DogSearchParams } from "../services/dogService";
import type { Dog } from "../types";
import DogCard from "../components/sections/DogCard";
import Spinner from "../components/common/Spinner";
import SearchBar from "../components/search/SearchBar";
import SortControls from "../components/search/SortControls";
import { getApiUrl } from "../config";
import LoadMoreSection from "../components/search/searchSections/LoadMoreButton";
import LoadMoreButton from "../components/search/searchSections/LoadMoreButton";

function SearchPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const [loading, setLoading] = useState(true);
  const [displayedDogs, setDisplayedDogs] = useState<Dog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<string>("breed:asc");

  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [matchingDogCount, setMatchingDogCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    const fetchDogs = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchParams: DogSearchParams = {
          size: 24,
          sort: currentSort,
        };

        if (selectedBreeds.length > 0) {
          searchParams.breeds = selectedBreeds;
        }

        const results = await dogService.searchDogs(searchParams);
        setMatchingDogCount(results.total);
        setNextCursor(results.next || null);
        setHasMore(!!results.next);

        if (results.resultIds.length > 0) {
          const dogsData = await dogService.getDogsByIds(results.resultIds);
          setDisplayedDogs(dogsData);
        } else {
          setDisplayedDogs([]);
        }
      } catch (error) {
        console.error("Error fetching dogs:", error);
        setError("Failed to fetch dogs. Please try again.");
        setDisplayedDogs([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchDogs();
    }
  }, [isLoggedIn, selectedBreeds, currentSort]);

  const loadMoreDogs = async () => {
    if (!hasMore || !nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const url = new URL(getApiUrl(nextCursor));
      const fromParam = url.searchParams.get("from");

      const searchParams: DogSearchParams = {
        size: 25,
        sort: currentSort,
        from: fromParam || undefined,
      };

      if (selectedBreeds.length > 0) {
        searchParams.breeds = selectedBreeds;
      }

      const results = await dogService.searchDogs(searchParams);

      setNextCursor(results.next || null);
      setHasMore(!!results.next);

      if (results.total > 0) {
        const newDogData = await dogService.getDogsByIds(results.resultIds);
        setDisplayedDogs((prevDogs) => [...prevDogs, ...newDogData]);
      } else {
        setDisplayedDogs([]);
      }
    } catch (error) {
      console.error("Error fetching dogs:", error);
      setError("Failed to fetch dogs. Please try again.");
      setDisplayedDogs([]);
      setHasMore(false);
    } finally {
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleBreedsChange = (breeds: string[]) => {
    setSelectedBreeds(breeds);
    setDisplayedDogs([]);
    setNextCursor(null);
    setHasMore(true);
  };

  const handleSortChange = (sort: string) => {
    setCurrentSort(sort);
    setDisplayedDogs([]);
    setNextCursor(null);
    setHasMore(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Find Your New Best Friend
        </h1>

        <SearchBar
          selectedBreeds={selectedBreeds}
          onBreedsChange={handleBreedsChange}
        />

        <SortControls
          currentSort={currentSort}
          onSortChange={handleSortChange}
        />

        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <Spinner />
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : displayedDogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedDogs.map((dog) => (
                <DogCard key={dog.id} dog={dog} />
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              No dogs found. Please try again later.
            </div>
          )}
        </div>

        {hasMore && (
          <div className="mt-12 text-center">
            <LoadMoreButton
              loadMoreDogs={loadMoreDogs}
              isLoadingMore={isLoadingMore}
              remainingDogs={matchingDogCount - displayedDogs.length}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
