import { Component, computed, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { switchMap } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule],
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

  constructor() {
    effect(() => {
      console.log(this.monsters());
    });
  }

  changeOffset(value: number) {
    this.offset.update((current) => current + value);
  }
}
