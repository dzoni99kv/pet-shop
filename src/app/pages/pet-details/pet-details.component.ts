import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../core/services/pet.service';
import { Pet } from '../../core/models/pet.model';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit {
  pet: Pet | null = null;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.petService.getPetById(id).subscribe(data => {
      this.pet = data;
    });
  }

  addToCart(): void {
    if (this.pet) {
      this.cartService.addToCart(this.pet);
      alert(`${this.pet.name} has been added to your cart!`);

    }
  }
}
