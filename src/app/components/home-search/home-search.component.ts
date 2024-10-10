import { Component, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home-search',
  standalone: true,
  imports: [ButtonModule, InputTextModule, FormsModule],
  templateUrl: './home-search.component.html',
  styleUrl: './home-search.component.scss',
})
export class HomeSearchComponent {
  search = model.required();

  searchPokemonEvent = output<void>({ alias: 'searchPokemon' });

  onSearchPokemonClicked() {
    this.searchPokemonEvent.emit();
  }
}
