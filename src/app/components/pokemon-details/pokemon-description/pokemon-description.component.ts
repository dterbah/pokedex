import { Component, computed, inject, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';
import { Pokemon, PokemonStats } from '../../../models/pokemon.model';
import { PokemonTypeService } from '../../../services/pokemon-type.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-pokemon-description',
  standalone: true,
  imports: [CardModule, DividerModule, FirstLetterUpperPipe, TableModule],
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.scss'],
})
export class PokemonDescriptionComponent {
  monster = input.required<Pokemon>();

  private pokemonTypeService = inject(PokemonTypeService);

  typeSprites = toSignal(
    toObservable(this.monster).pipe(
      switchMap((pokemon) =>
        this.pokemonTypeService.getTypeSprites(pokemon.types)
      )
    )
  );

  stats = computed(() => {
    return Object.keys(this.monster().stats).map((statName) => {
      return {
        name: statName,
        value: this.monster().stats[statName as keyof PokemonStats],
        img: `/assets/img/${statName}.png`,
      };
    });
  });
}
