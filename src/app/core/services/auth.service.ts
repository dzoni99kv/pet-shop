import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  register(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser = user;
  }

  login(email: string, password: string): boolean {
    const stored = localStorage.getItem('user');
    if (!stored) return false;

    const user: User = JSON.parse(stored);
    user.id = Number(user.id); // Ensure id is a number
    if (user.email === email && user.password === password) {
      this.currentUser = user;
      return true;
    }
    return false;
  }

  // auth.service.ts

  getCurrentUser(): User | null {
  if (this.currentUser) return this.currentUser;

  const stored = localStorage.getItem('user');
  if (stored) {
    const user: User = JSON.parse(stored);
    user.id = Number(user.id); // ✅ Convert ID to number
    this.currentUser = user;
    return user;
  }

  return null;
}



  getUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }

  logout(): void {
    this.currentUser = null;
  }

  updateProfile(updatedUser: User): void {
    localStorage.setItem('user', JSON.stringify(updatedUser));
    this.currentUser = updatedUser;
  }
}
