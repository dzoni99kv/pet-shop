import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PetDetailsComponent } from './pages/pet-details/pet-details.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pet/:id', component: PetDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'profile', component: ProfileComponent,  },
  { path: 'auth', component: AuthComponent, },
  
];
