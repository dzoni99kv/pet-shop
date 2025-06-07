import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { RouterModule} from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { User } from './core/models/user.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true, // ✅ REQUIRED
  imports: [RouterOutlet, ChatbotComponent, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ FIXED
})
export class AppComponent {
  title = 'pet-shop';
  showBot = true;
  currentUser: User | null = null;

  constructor(private authService: AuthService) {
    // ✅ Subscribe to live user updates
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/auth';
  }  
}
