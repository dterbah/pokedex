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
import { toSignal } from '@angular/core/rxjs-interop';
import { of, Subscription } from 'rxjs';

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

  typeSprites = signal<string[]>([]);
  typeSprites$ = computed(() => {
    const currentMonster = this.monster();
    if (!currentMonster) return of<string[]>([]);

    // Si getTypeSprites retourne un Observable
    const typesObservable = this.pokemonTypeService.getTypeSprites(
      currentMonster.types
    );

    return typesObservable;
  });

  constructor() {
    effect(() => {
      this.typeSubscription = this.typeSprites$().subscribe((value) =>
        this.typeSprites.set(value)
      );
    });
  }

  ngOnDestroy(): void {
    this.typeSubscription?.unsubscribe();
  }
}
