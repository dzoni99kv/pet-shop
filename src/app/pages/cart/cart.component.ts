import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { Pet } from '../../core/models/pet.model';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Pet[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  remove(index: number): void {
    this.cartService.removeFromCart(index);
    this.cartItems = this.cartService.getItems(); // refresh
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }
  updateStatus(pet: Pet, newStatus: string | undefined): void {
    if (newStatus) {
      pet.status = newStatus as 'in progress' | 'cancelled' | 'completed';
    }
  }

  ratePet(pet: Pet, rating: number | undefined): void {
    if (pet.status === 'completed' && typeof rating === 'number') {
      pet.userRating = rating;
    }
  }
}
