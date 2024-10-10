import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';
import { POKEMON_LIMIT } from '../../services/constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonCardComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private pokemonService = inject(PokemonService);
  offset = signal(0);
  private offset$ = toObservable(this.offset);
  pokemonCount = this.pokemonService.pokemonCount;

  monsters = toSignal(
    this.offset$.pipe(
      switchMap((offset) => this.pokemonService.getPokemons(offset))
    ),
    { initialValue: [] as Pokemon[] }
  );

  loadNextPokemons() {
    this.offset.update((current) => current + POKEMON_LIMIT);
  }

  loadPreviousPokemons() {
    this.offset.update((current) => current - POKEMON_LIMIT);
  }
}
