import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'pet/:id', component: PetDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent,  },
  { path: 'auth-login', component: LoginComponent },
  { path: 'auth-register', component: RegistrationComponent },
];
