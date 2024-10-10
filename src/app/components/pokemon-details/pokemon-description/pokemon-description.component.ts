import { Component, computed, effect, input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';
import { Pokemon, PokemonStats } from '../../../models/pokemon.model';

@Component({
  selector: 'app-pokemon-description',
  standalone: true,
  imports: [CardModule, DividerModule, FirstLetterUpperPipe],
  templateUrl: './pokemon-description.component.html',
  styleUrls: ['./pokemon-description.component.scss'],
})
export class PokemonDescriptionComponent {
  monster = input.required<Pokemon>();

  stats = computed(() => {
    return Object.keys(this.monster().stats).map((statName) => {
      return {
        name: statName,
        value: this.monster().stats[statName as keyof PokemonStats],
      };
    });
  });
}
