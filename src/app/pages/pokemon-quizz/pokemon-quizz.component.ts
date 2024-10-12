import { inject, signal, model, effect, Component } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { getRandomNumber } from '../../utils/random.utils';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-pokemon-quizz',
  standalone: true,
  imports: [InputTextModule, FormsModule, ButtonModule, MessagesModule],
  templateUrl: './pokemon-quizz.component.html',
  styleUrl: './pokemon-quizz.component.scss',
})
export class PokemonQuizzComponent {
  private pokemonService = inject(PokemonService);

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

  constructor() {
    effect(() => {
      const currentMonster = this.monster();
      if (currentMonster) {
        console.log(currentMonster);
      }
    });
  }

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
    } else {
      this.error.set(true);
    }
  }
}
