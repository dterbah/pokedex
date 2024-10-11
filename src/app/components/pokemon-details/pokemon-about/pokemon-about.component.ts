import { Component, computed, effect, inject, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';
import { ReplaceDashWithSpacePipe } from '../../../pipes/replace-dash-with-space.pipe';
import { PokemonAbilityService } from '../../../services/pokemon-ability.service';
import { Pokemon } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-about',
  standalone: true,
  imports: [
    AccordionModule,
    TableModule,
    FirstLetterUpperPipe,
    ReplaceDashWithSpacePipe,
  ],
  templateUrl: './pokemon-about.component.html',
  styleUrl: './pokemon-about.component.scss',
})
export class PokemonAboutComponent {
  private pokemonAbilityService = inject(PokemonAbilityService);

  monster = input.required<Pokemon>();

  images = computed(() => {
    const { front, back, frontShiny, backShiny } = this.monster().sprites;
    return [front, back, frontShiny, backShiny];
  });

  abilities = toSignal(
    toObservable(this.monster).pipe(
      switchMap((pokemon) =>
        this.pokemonAbilityService.getAbilitiesDescriptions(
          this.monster().abilities.map((ability) => ability.name)
        )
      ),
      map((foundAbilities) => {
        return foundAbilities.map((ability, index) => {
          return { ...ability, hidden: this.monster().abilities[index].hidden };
        });
      })
    )
  );

  constructor() {
    effect(() => {
      console.log('abilities', this.abilities());
    });
  }
}
