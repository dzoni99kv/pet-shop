export interface Pet {
  id: number;
  name: string;
  description: string;
  species: string;
  age: number;
  size: string;
  origin: string;
  price: number;
  rating: number;
  reviews: string[];
  status?: 'in progress' | 'cancelled' | 'completed';
  userRating?: number;
}
