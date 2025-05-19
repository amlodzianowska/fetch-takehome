import type { Dog } from "../types";

export const featuredDogs: Dog[] = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: 2,
    img: "/src/assets/images/pet-thumbnails/max.png",
    zip_code: "60660",
  },
  {
    id: "2",
    name: "Bella",
    breed: "Labrador",
    age: 1,
    img: "/src/assets/images/pet-thumbnails/bella.png",
    zip_code: "60606",
  },
  {
    id: "3",
    name: "Charlie",
    breed: "French Bulldog",
    age: 3,
    img: "/src/assets/images/pet-thumbnails/charlie.png",
    zip_code: "60614",
  },
  {
    id: "4",
    name: "Luna",
    breed: "German Shepherd",
    age: 2,
    img: "/src/assets/images/pet-thumbnails/luna.png",
    zip_code: "60657",
  },
];

/**
 * Additional mock pets
 */
export const allDogs: Dog[] = [
  ...featuredDogs,
  {
    id: "5",
    name: "Cooper",
    breed: "Beagle",
    age: 1,
    img: "/src/assets/images/pet-thumbnails/cooper.png",
    zip_code: "60611",
  },
  {
    id: "6",
    name: "Lucy",
    breed: "Dachshund",
    age: 4,
    img: "/src/assets/images/pet-thumbnails/lucy.png",
    zip_code: "60615",
  },
];

export const getDogById = (id: string): Dog | undefined => {
  return allDogs.find((dog) => dog.id === id);
};

export default featuredDogs;
