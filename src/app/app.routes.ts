import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PokemonDetailsComponent } from './pages/pokemon-details/pokemon-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'details/:name',
    component: PokemonDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
