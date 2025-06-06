import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private authService: AuthService) {}

  private get user() {
    return this.authService.getCurrentUser();
  }

  getItems(): Pet[] {
    return this.user?.cart || [];
  }

  addToCart(pet: Pet): void {
    if (this.user) {
      this.user.cart.push(pet);
      this.authService.updateProfile(this.user); // persist
    }
  }

  removeFromCart(index: number): void {
    if (this.user) {
      this.user.cart.splice(index, 1);
      this.authService.updateProfile(this.user); // persist
    }
  }

  getTotal(): number {
    return this.getItems().reduce((sum, pet) => sum + pet.price, 0);
  }
}
