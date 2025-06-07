import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../core/models/reservation.model';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PetService } from '../../core/services/pet.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {
  cartItems: Reservation[] = [];
  cart: Reservation[] = [];
  total: number = 0;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.loadCart();
  }

  updateStatus(item: Reservation, status: string): void {
    item.status = status as any;
    this.authService.updateCurrentUser(this.authService.getCurrentUser()!);
  }
  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cart.reduce((sum, r) => sum + r.pet.price, 0);
  }

  removeFromCart(petId: number): void {
    this.cartService.removeFromCart(petId);
    this.cartItems = this.cartService.getCart(); // refresh
  }

  ratePet(item: Reservation): void {
    const rating = item.userRating;
    if (rating === undefined || rating < 0 || rating > 5) return;

    const reviewText = `${rating} ⭐ from ${
      this.authService.getCurrentUser()?.fullName || 'anonymous'
    }`;

    // Add review locally to cart
    if (!item.pet.reviews.includes(reviewText)) {
      item.pet.reviews.push(reviewText);
    }

    // Recalculate average rating
    const ratingNumbers = item.pet.reviews
      .map((r) => parseInt(r)) // assumes format like "5 ⭐ from..."
      .filter((n) => !isNaN(n));
    item.pet.rating = ratingNumbers.length
      ? Number(
          (
            ratingNumbers.reduce((a, b) => a + b) / ratingNumbers.length
          ).toFixed(1)
        )
      : rating;

    // Save updated pet to backend
    this.petService.updatePet(item.pet).subscribe({
      next: () => {
        this.cartService.updateReservation(item); // optional: update local cart
        alert('Rating submitted!');
      },
      error: (err) => {
        console.error('Failed to update rating:', err);
      },
    });
  }

  remove(index: number): void {
    this.cartItems.splice(index, 1);
    const user = this.authService.getCurrentUser();
    if (user) {
      user.cart = this.cartItems;
      this.authService.updateCurrentUser(user);
    }
  }
  hasUserRated(item: Reservation): boolean {
  const userName = this.authService.getCurrentUser()?.fullName;
  return item.pet.reviews.some(r => r.includes(`from ${userName}`));
}

  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.pet.price, 0);
  }
}
