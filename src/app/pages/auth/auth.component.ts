import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isRegistering = false;

  loginEmail = '';
  loginPassword = '';

  registerUser: User = {
    id: 1,
    fullName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    favoriteSpecies: '',
    cart: []
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const success = this.authService.login(this.loginEmail, this.loginPassword);
    if (success) {
      alert('Login successful!');
      this.router.navigate(['/profile']);
    } else {
      alert('Invalid email or password.');
    }
  }

  register(): void {
    this.authService.register(this.registerUser);
    alert('Registration successful! You can now log in.');
    this.isRegistering = false;
  }
}
