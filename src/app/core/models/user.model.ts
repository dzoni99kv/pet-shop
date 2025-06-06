import { Pet } from "./pet.model";

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  favoriteSpecies: string;
  cart: Pet[];
}
