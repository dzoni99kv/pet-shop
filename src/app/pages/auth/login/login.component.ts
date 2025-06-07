import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginEmail = '';
  loginPassword = '';
  loginError = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    const success = this.authService.login(this.loginEmail, this.loginPassword);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.loginError = 'Invalid email or password.';
    }
  }
}
