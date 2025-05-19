import type { ReactNode } from "react";

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  imageUrl: string;
  description?: string;
  gender?: "male" | "female";
  size?: "small" | "medium" | "large";
  adoptionStatus?: "available" | "pending" | "adopted";
}
export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}

export interface Location {
  zip_code: string;
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  county: string;
}

export interface Coordinates {
  lat: number;
  lon: number;
}

export interface Match {
  match: string;
}
