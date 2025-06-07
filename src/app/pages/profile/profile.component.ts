import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    if (!this.user) {
      alert('You must be logged in to view your profile.');
      this.router.navigate(['/auth-login']);
    }
  }

  save(): void {
    if (this.user) {
      this.authService.updateCurrentUser(this.user);
      alert('Profile updated!');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
