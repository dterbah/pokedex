import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { PokemonMovesService } from '../../../services/pokemon-moves.service';
import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';
import { ReplaceDashWithSpacePipe } from '../../../pipes/replace-dash-with-space.pipe';

@Component({
  selector: 'app-pokemon-moves',
  standalone: true,
  imports: [TableModule, FirstLetterUpperPipe, ReplaceDashWithSpacePipe],
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
}
