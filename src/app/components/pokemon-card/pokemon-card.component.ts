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
import { ButtonModule } from 'primeng/button';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Subscription, switchMap } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { FirstLetterUpperPipe } from '../../pipes/first-letter-upper.pipe';
import { PokemonTypeService } from '../../services/pokemon-type.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CardModule, FirstLetterUpperPipe, ButtonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
})
export class PokemonCardComponent implements OnDestroy {
  private pokemonTypeService = inject(PokemonTypeService);
  private router = inject(Router);

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

  goToPokemonDetails(pokemonName: string) {
    this.router.navigate(['details', pokemonName]);
  }
}
