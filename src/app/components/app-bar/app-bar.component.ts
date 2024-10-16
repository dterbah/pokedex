import { Component, inject, model } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

import { HomeSearchComponent } from '../home-search/home-search.component';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MenubarModule, HomeSearchComponent],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.scss',
})
export class AppBarComponent {
  private router = inject(Router);

  search = model('');

  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/home',
    },
    {
      label: 'Shop Simulation',
      icon: 'pi pi-shopping-cart',
      routerLink: '/shop-simulation',
    },
    {
      label: 'Quizz',
      icon: 'pi pi-question',
      routerLink: '/quizz',
    },
  ];

  searchPokemon() {
    // redirect user to pokemon details
    this.router.navigate(['details', this.search().toLowerCase()]);
    this.search.set('');
  }
}
