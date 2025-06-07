import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:3000/pets';

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }
  updatePet(pet: Pet): Observable<Pet> {
  return this.http.put<Pet>(`http://localhost:3000/pets/${pet.id}`, pet);
}


  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }
  getGlobalRating(petId: number): { average: number; count: number } {
    const data = localStorage.getItem('users');
    if (!data) return { average: 0, count: 0 };

    const users: User[] = JSON.parse(data);
    const ratings: number[] = [];

    for (const user of users) {
      if (!Array.isArray(user.cart)) continue;

      for (const reservation of user.cart) {
        if (
          reservation.pet.id === petId &&
          reservation.status === 'completed' &&
          typeof reservation.userRating === 'number'
        ) {
          ratings.push(reservation.userRating);
        }
      }
    }

    if (ratings.length === 0) return { average: 0, count: 0 };

    const total = ratings.reduce((sum, r) => sum + r, 0);
    const avg = Math.round((total / ratings.length) * 10) / 10;
    return { average: avg, count: ratings.length };
  }
}
