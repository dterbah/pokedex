import { Component, effect, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { PokemonMovesService } from '../../../services/pokemon-moves.service';

@Component({
  selector: 'app-pokemon-moves',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-moves.component.html',
  styleUrl: './pokemon-moves.component.scss',
})
export class PokemonMovesComponent {
  private moveService = inject(PokemonMovesService);

  movesUrl = input.required<string[]>();

  moves = toSignal(
    toObservable(this.movesUrl).pipe(
      switchMap((movesUrl) => this.moveService.getMoves(movesUrl))
    )
  );

  constructor() {
    console.log('ok');
    effect(() => console.log(this.moves()));
  }
}
