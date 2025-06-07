import { Pet } from './pet.model';

export interface Reservation {
  pet: Pet;
  status: 'in progress' | 'cancelled' | 'completed';
  userRating?: number;
}
