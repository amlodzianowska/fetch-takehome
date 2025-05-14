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
