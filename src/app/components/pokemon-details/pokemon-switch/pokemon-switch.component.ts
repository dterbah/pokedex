import { Component, inject, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-switch',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './pokemon-switch.component.html',
  styleUrl: './pokemon-switch.component.scss',
})
export class PokemonSwitchComponent {
  monsterId = input.required<number>();
  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  pokemonLimit = this.pokemonService.pokemonCount;

  changePokemonDetails(offset: number) {
    this.router.navigate(['details', this.monsterId() + offset]);
  }
}
