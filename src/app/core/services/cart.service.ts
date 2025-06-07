import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Pet } from '../models/pet.model';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private authService: AuthService) {}

  private get user(): User {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) throw new Error('User not logged in.');
    if (!currentUser.cart) currentUser.cart = [];
    return currentUser;
  }

  getCart(): Reservation[] {
    return this.user.cart;
  }

  addToCart(pet: Pet): void {
    const exists = this.user.cart.find((r: Reservation) => r.pet.id === pet.id);
    if (!exists) {
      this.user.cart.push({ pet, status: 'in progress' });
      this.authService.updateCurrentUser(this.user);
    }
  }

  removeFromCart(petId: number): void {
    const index = this.user.cart.findIndex((r) => r.pet.id === petId);
    if (index !== -1) {
      this.user.cart.splice(index, 1);
      this.authService.updateCurrentUser(this.user); // ✅ sync to localStorage
    }
  }

  clearCart(): void {
    this.user.cart = [];
    this.authService.updateCurrentUser(this.user);
  }
  updateReservation(updated: Reservation): void {
  const index = this.user.cart.findIndex(r => r.pet.id === updated.pet.id);
  if (index !== -1) {
    this.user.cart[index] = updated;
    this.authService.updateCurrentUser(this.user);
  }
}

}
