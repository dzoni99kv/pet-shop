import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetService } from '../../core/services/pet.service';
import { Pet } from '../../core/models/pet.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
FormsModule;
RouterModule;
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  priceMin: number = 0;
  priceMax: number = 1000;
  minRating: number = 0;

  searchQuery = '';
  selectedSpecies = '';
  selectedSize = '';
  selectedOrigin = '';

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.petService.getPets().subscribe((data) => {
      this.pets = data;
      this.filteredPets = data;
    });
  }

  filterPets(): void {
  const query = this.searchQuery.trim().toLowerCase();

  this.filteredPets = this.pets.filter(pet =>
    pet.name.toLowerCase().includes(query) &&
    (this.selectedSpecies ? pet.species === this.selectedSpecies : true) &&
    (this.selectedSize ? pet.size === this.selectedSize : true) &&
    (this.selectedOrigin ? pet.origin === this.selectedOrigin : true) &&
    pet.price >= this.priceMin &&
    pet.price <= this.priceMax &&
    pet.rating >= this.minRating
  );
}


  get uniqueSpecies(): string[] {
    return [...new Set(this.pets.map((p) => p.species))];
  }

  get uniqueSizes(): string[] {
    return [...new Set(this.pets.map((p) => p.size))];
  }

  get uniqueOrigins(): string[] {
    return [...new Set(this.pets.map((p) => p.origin))];
  }
}
