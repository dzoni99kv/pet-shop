import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegistrationComponent {
  registerError = '';
  registerUser: User = {
    id: Date.now(),
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    favoriteSpecies: '',
    cart: []
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.registerUser.id = Date.now();
    const success = this.authService.register(this.registerUser);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.registerError = 'Email already in use.';
    }
  }
}
