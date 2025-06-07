import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  message: string;
}

type ChatMessage = {
  sender: 'user' | 'bot';
  message: string;
};
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})


export class ChatbotComponent {
  messages: ChatMessage[] = []; // ✅ add type here
  newMessage = '';
  isOpen = false;

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  send() {
    if (!this.newMessage.trim()) return;

    this.messages.push({ sender: 'user', message: this.newMessage });
    this.newMessage = '';

    setTimeout(() => {
      this.messages.push({ sender: 'bot', message: 'Hello! How can I help?' });
    }, 600);
  }
}
