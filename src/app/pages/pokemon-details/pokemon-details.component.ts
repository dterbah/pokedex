import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  pokemonName = toSignal(
    this.route.params.pipe(map((params) => params['name']))
  );

  monster = toSignal(this.pokemonService.getPokemonByName(this.pokemonName()));
}
