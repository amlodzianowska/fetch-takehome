import { useState, useEffect, useCallback } from "react";
import dogService from "../services/dogService";
import type { DogSearchParams } from "../services/dogService";
import type { Dog } from "../types";
import { getApiUrl } from "../config";

interface UseSearchOptions {
  initialSize?: number;
  initialSort?: string;
}

interface UseSearchReturn {
  displayedDogs: Dog[];
  loading: boolean;
  error: string | null;
  isLoadingMore: boolean;

  hasMore: boolean;
  matchingDogCount: number;
  nextCursor: string | null;

  loadMoreDogs: () => Promise<void>;
  refreshSearch: () => Promise<void>;

  selectedBreeds: string[];
  currentSort: string;
  currentPageSize: number;
  setSelectedBreeds: (breeds: string[]) => void;
  setCurrentSort: (sort: string) => void;
  setCurrentPageSize: (size: number) => void;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { initialSize = 24, initialSort = "breed:asc" } = options;

  const [displayedDogs, setDisplayedDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [currentSort, setCurrentSort] = useState<string>(initialSort);
  const [currentPageSize, setCurrentPageSize] = useState<number>(initialSize);

  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [matchingDogCount, setMatchingDogCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState(false);

  const performSearch = useCallback(
    async (isInitialSearch = true) => {
      if (isInitialSearch) {
        setLoading(true);
      } else {
        setIsLoadingMore(true);
      }

      setError(null);

      try {
        const searchParams: DogSearchParams = {
          size: currentPageSize,
          sort: currentSort,
        };

        if (selectedBreeds.length > 0) {
          searchParams.breeds = selectedBreeds;
        }

        if (!isInitialSearch && nextCursor) {
          const url = new URL(getApiUrl(nextCursor));
          const fromParam = url.searchParams.get("from");
          if (fromParam) {
            searchParams.from = fromParam;
          }
        }

        const results = await dogService.searchDogs(searchParams);

        setMatchingDogCount(results.total);
        setNextCursor(results.next || null);
        setHasMore(!!results.next);

        if (results.resultIds.length > 0) {
          const dogsData = await dogService.getDogsByIds(results.resultIds);

          if (isInitialSearch) {
            setDisplayedDogs(dogsData);
          } else {
            setDisplayedDogs((prevDogs) => [...prevDogs, ...dogsData]);
          }
        } else {
          if (isInitialSearch) {
            setDisplayedDogs([]);
          }
        }
      } catch (searchError) {
        console.error("Error performing search:", searchError);
        const errorMessage =
          searchError instanceof Error
            ? searchError.message
            : "Failed to fetch dogs. Please try again.";

        setError(errorMessage);

        if (isInitialSearch) {
          setDisplayedDogs([]);
          setHasMore(false);
        }
      } finally {
        if (isInitialSearch) {
          setLoading(false);
        } else {
          setIsLoadingMore(false);
        }
      }
    },
    [selectedBreeds, currentSort, currentPageSize, nextCursor]
  );

  const loadMoreDogs = useCallback(async () => {
    if (!hasMore || !nextCursor || isLoadingMore) {
      return;
    }

    await performSearch(false);
  }, [hasMore, nextCursor, isLoadingMore, performSearch]);

  const refreshSearch = useCallback(async () => {
    setDisplayedDogs([]);
    setNextCursor(null);
    setHasMore(true);
    await performSearch(true);
  }, [performSearch]);

  useEffect(() => {
    refreshSearch();
  }, [selectedBreeds, currentSort, currentPageSize]);

  const handleSetSelectedBreeds = useCallback((breeds: string[]) => {
    setSelectedBreeds(breeds);
  }, []);

  const handleSetCurrentSort = useCallback((sort: string) => {
    setCurrentSort(sort);
  }, []);

  const handleSetCurrentPageSize = useCallback((size: number) => {
    setCurrentPageSize(size);
  }, []);

  return {
    displayedDogs,
    loading,
    error,
    isLoadingMore,

    hasMore,
    matchingDogCount,
    nextCursor,

    loadMoreDogs,
    refreshSearch,

    selectedBreeds,
    currentSort,
    currentPageSize,
    setSelectedBreeds: handleSetSelectedBreeds,
    setCurrentSort: handleSetCurrentSort,
    setCurrentPageSize: handleSetCurrentPageSize,
  };
}
