import config, { getApiUrl } from "../config";
import type { Dog } from "../types";

interface DogSearchParams {
  size?: number;
}

interface DogSearchResults {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

const dogService = {
  getBreeds: async (): Promise<string[]> => {
    const response = await fetch(getApiUrl(config.api.endpoints.dogs.breeds), {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dog breeds: ${response.status}`);
    }

    return response.json();
  },

  searchDogs: async (
    params: DogSearchParams = {}
  ): Promise<DogSearchResults> => {
    const size = params.size || 5;

    const response = await fetch(
      getApiUrl(`${config.api.endpoints.dogs.search}?size=${size}`),
      { credentials: "include" }
    );

    if (!response.ok) {
      throw new Error(`Failed to search dogs: ${response.status}`);
    }

    return response.json();
  },

  getDogsByIds: async (ids: string[]): Promise<Dog[]> => {
    if (!ids.length) {
      return [];
    }

    const response = await fetch(getApiUrl(config.api.endpoints.dogs.byIds), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dogs by IDs: ${response.status}`);
    }

    return response.json();
  },
};

export default dogService;
