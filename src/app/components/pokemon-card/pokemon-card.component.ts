import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { CardModule } from 'primeng/card';
import { Pokemon } from '../../models/pokemon.model';
import { FirstLetterUpperPipe } from '../../pipes/first-letter-upper.pipe';
import { PokemonTypeService } from '../../services/pokemon-type.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CardModule, FirstLetterUpperPipe],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnDestroy {
  private pokemonTypeService = inject(PokemonTypeService);

  private typeSubscription: Subscription | undefined = undefined;

  monster = input.required<Pokemon>();

  typeSprites = toSignal(
    toObservable(this.monster).pipe(
      switchMap((pokemon) =>
        this.pokemonTypeService.getTypeSprites(pokemon.types)
      )
    )
  );

  ngOnDestroy(): void {
    this.typeSubscription?.unsubscribe();
  }
}
