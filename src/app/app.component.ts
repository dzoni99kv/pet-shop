import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ REQUIRED
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ FIXED
})
export class AppComponent {
  title = 'pet-shop';
  showBot = true;
}
