import { Component, computed, input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { Pokemon } from '../../../models/pokemon.model';
import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';

@Component({
  selector: 'app-pokemon-about',
  standalone: true,
  imports: [AccordionModule, FirstLetterUpperPipe],
  templateUrl: './pokemon-about.component.html',
  styleUrl: './pokemon-about.component.scss',
})
export class PokemonAboutComponent {
  monster = input.required<Pokemon>();

  images = computed(() => {
    const { front, back, frontShiny, backShiny } = this.monster().sprites;
    return [front, back, frontShiny, backShiny];
  });
}
