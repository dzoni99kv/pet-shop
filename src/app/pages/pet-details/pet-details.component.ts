import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../core/services/pet.service';
import { CartService } from '../../core/services/cart.service';
import { Pet } from '../../core/models/pet.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
})
export class PetDetailsComponent implements OnInit {
  pet!: Pet;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(id).subscribe(pet => {
      this.pet = pet;
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.pet);
  }

  removeFromCart(): void {
    this.cartService.removeFromCart(this.pet.id);
  }

  isInCart(): boolean {
    return this.cartService.getCart().some(r => r.pet.id === this.pet.id);
  }

  getRating(petId: number): string {
    const reviews = this.pet.reviews;
    return reviews.length ? `${this.pet.rating} / 5` : "No reviews yet";
  }
}
