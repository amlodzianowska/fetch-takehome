import { useState, useEffect } from "react";
import dogService from "../services/dogService";

interface UseBreedsReturn {
  breeds: string[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBreeds(): UseBreedsReturn {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBreeds = async () => {
    setLoading(true);
    setError(null);

    try {
      const breedList = await dogService.getBreeds();
      setBreeds(breedList.sort());
    } catch (err) {
      console.error("Error fetching breeds:", err);
      setError("Failed to load breeds");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  const refetch = () => {
    fetchBreeds();
  };

  return { breeds, loading, error, refetch };
}
