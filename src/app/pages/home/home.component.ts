import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';
import { PokemonCardComponent } from '../../components/pokemon-card/pokemon-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private pokemonService = inject(PokemonService);
  offset = signal(0);
  private offset$ = toObservable(this.offset);

  monsters = toSignal(
    this.offset$.pipe(
      switchMap((offset) => this.pokemonService.getPokemons(offset))
    ),
    { initialValue: [] as Pokemon[] }
  );

  changeOffset(value: number) {
    this.offset.update((current) => current + value);
  }
}
