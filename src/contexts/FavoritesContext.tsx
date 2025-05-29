import { createContext, useContext, useState, useCallback } from "react";
import type { Dog } from "../types";
import type { PropsWithChildren } from "react";

interface FavoritesContextType {
  favoriteDogs: Dog[];
  favoriteDogIds: Set<string>;
  addToFavorites: (dog: Dog) => void;
  removeFromFavorites: (dogId: string) => void;
  toggleFavorite: (dog: Dog) => void;
  isFavorite: (dogId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favoriteDogs: [],
  favoriteDogIds: new Set(),
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  toggleFavorite: () => {},
  isFavorite: () => false,
  clearFavorites: () => {},
});

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [favoriteDogIds, setFavoriteDogIds] = useState<Set<string>>(new Set());

  const addToFavorites = useCallback((dog: Dog) => {
    setFavoriteDogs((prev) => {
      if (prev.some((d) => d.id === dog.id)) {
        return prev;
      }
      return [...prev, dog];
    });

    setFavoriteDogIds((prev) => new Set([...prev, dog.id]));
  }, []);

  const removeFromFavorites = useCallback((dogId: string) => {
    setFavoriteDogs((prev) => prev.filter((dog) => dog.id !== dogId));
    setFavoriteDogIds((prev) => {
      const newSet = new Set(prev);
      newSet.delete(dogId);
      return newSet;
    });
  }, []);

  const toggleFavorite = useCallback(
    (dog: Dog) => {
      if (favoriteDogIds.has(dog.id)) {
        removeFromFavorites(dog.id);
      } else {
        addToFavorites(dog);
      }
    },
    [favoriteDogIds, addToFavorites, removeFromFavorites]
  );

  const isFavorite = useCallback(
    (dogId: string) => {
      return favoriteDogIds.has(dogId);
    },
    [favoriteDogIds]
  );

  const clearFavorites = useCallback(() => {
    setFavoriteDogs([]);
    setFavoriteDogIds(new Set());
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favoriteDogs,
        favoriteDogIds,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
