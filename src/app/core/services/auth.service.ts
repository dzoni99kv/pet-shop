import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs'; // ✅

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  // ✅ Add BehaviorSubject to broadcast changes
  currentUser$ = new BehaviorSubject<User | null>(null);

  constructor() {
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      this.currentUser$.next(this.currentUser); // sync on load
    }
  }

  register(user: User): boolean {
    const users = this.getAllUsers();
    if (users.find((u) => u.email === user.email)) return false;

    users.push(user);
    this.saveAllUsers(users);
    this.setCurrentUser(user);
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return false;

    this.setCurrentUser(user);
    return true;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUser$.next(null); // ✅ broadcast logout
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUser$.next(user); // ✅ broadcast login/register
  }

  private getAllUsers(): User[] {
    const stored = localStorage.getItem('users');
    return stored ? JSON.parse(stored) : [];
  }

  private saveAllUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  updateCurrentUser(updated: User): void {
    const users = this.getAllUsers().map((u) =>
      u.email === updated.email ? updated : u
    );
    this.saveAllUsers(users);
    this.currentUser = updated;
    localStorage.setItem('currentUser', JSON.stringify(updated));
    this.currentUser$.next(updated); // ✅ so AppComponent reacts too
  }
}
