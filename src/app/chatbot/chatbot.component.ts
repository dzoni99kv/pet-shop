import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  message: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: Message[] = [];
  newMessage = '';

  constructor(private http: HttpClient) {}

  send(): void {
    if (!this.newMessage.trim()) return;

    const userMessage = this.newMessage;
    this.messages.push({ sender: 'user', message: userMessage });
    this.newMessage = '';

    this.http.post<any>('http://localhost:5005/webhooks/rest/webhook', {
      sender: 'user',
      message: userMessage
    }).subscribe((responses) => {
      responses.forEach((r: any) => {
        this.messages.push({ sender: 'bot', message: r.text });
      });
    });
  }
}
