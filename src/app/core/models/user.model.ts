import { Reservation } from './reservation.model';

export interface User {
  id: number;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  favoriteSpecies: string;
  cart: Reservation[];
}
