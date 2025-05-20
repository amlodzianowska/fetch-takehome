import config, { getApiUrl } from "../config";
import type { Dog } from "../types";

export interface DogSearchParams {
  size?: number;
  breeds?: string[];
  sort?: string;
  from?: string;
}

interface DogSearchResults {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

const dogService = {
  endpoints: config.api.endpoints.dogs,

  getBreeds: async (): Promise<string[]> => {
    const response = await fetch(getApiUrl(dogService.endpoints.breeds), {
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
    const size = params.size || 100;

    const queryParams = new URLSearchParams();

    queryParams.append("size", size.toString());

    queryParams.append("sort", params.sort || "breed:asc");

    if (params.from) {
      queryParams.append("from", params.from);
    }

    if (params.breeds && params.breeds.length > 0) {
      params.breeds.forEach((breed) => {
        queryParams.append("breeds", breed);
      });
    }

    const response = await fetch(
      getApiUrl(`${dogService.endpoints.search}?${queryParams.toString()}`),
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

    const response = await fetch(getApiUrl(dogService.endpoints.byIds), {
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
