import { inject, signal, model, effect, Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { getRandomNumber } from '../../utils/random.utils';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-pokemon-quizz',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, TooltipModule],
  templateUrl: './pokemon-quizz.component.html',
  styleUrl: './pokemon-quizz.component.scss',
})
export class PokemonQuizzComponent {
  private pokemonService = inject(PokemonService);

  goodAnswers = 0;

  pokemonIndex = signal(getRandomNumber(0, this.pokemonService.pokemonCount()));

  monster = toSignal(
    toObservable(this.pokemonIndex).pipe(
      switchMap((index) =>
        this.pokemonService.getPokemonByName(index.toString())
      )
    )
  );

  search = model('');
  error = signal(false);

  onAnswer() {
    const currentMonster = this.monster();
    if (
      currentMonster &&
      currentMonster.name.toLowerCase() === this.search().toLowerCase()
    ) {
      this.error.set(false);
      this.pokemonIndex.set(
        getRandomNumber(0, this.pokemonService.pokemonCount())
      );
      this.goodAnswers++;
    } else {
      this.error.set(true);
    }
  }
}
