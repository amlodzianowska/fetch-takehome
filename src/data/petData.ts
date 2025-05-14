import type { Pet } from "../types";

export const featuredPets: Pet[] = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: 2,
    imageUrl: "/src/assets/images/pet-thumbnails/max.png",
    description: "A friendly and playful golden retriever.",
    gender: "male",
    size: "large",
    adoptionStatus: "available",
  },
  {
    id: "2",
    name: "Bella",
    breed: "Labrador",
    age: 1,
    imageUrl: "/src/assets/images/pet-thumbnails/bella.png",
    description: "A sweet and energetic labrador.",
    gender: "female",
    size: "large",
    adoptionStatus: "available",
  },
  {
    id: "3",
    name: "Charlie",
    breed: "French Bulldog",
    age: 3,
    imageUrl: "/src/assets/images/pet-thumbnails/charlie.png",
    description: "A charming and affectionate french bulldog.",
    gender: "male",
    size: "medium",
    adoptionStatus: "available",
  },
  {
    id: "4",
    name: "Luna",
    breed: "German Shepherd",
    age: 2,
    imageUrl: "/src/assets/images/pet-thumbnails/luna.png",
    description: "A loyal and protective german shepherd.",
    gender: "female",
    size: "large",
    adoptionStatus: "available",
  },
];

/**
 * Additional mock pets
 */
export const allPets: Pet[] = [
  ...featuredPets,
  {
    id: "5",
    name: "Cooper",
    breed: "Beagle",
    age: 1,
    imageUrl: "/src/assets/images/pet-thumbnails/cooper.png",
  },
  {
    id: "6",
    name: "Lucy",
    breed: "Dachshund",
    age: 4,
    imageUrl: "/src/assets/images/pet-thumbnails/lucy.png",
  },
];

export const getPetById = (id: string): Pet | undefined => {
  return allPets.find((pet) => pet.id === id);
};

export default featuredPets;
