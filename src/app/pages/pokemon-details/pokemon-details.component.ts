import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { LottieComponent } from 'ngx-lottie';
import { PanelModule } from 'primeng/panel';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDescriptionComponent } from '../../components/pokemon-details/pokemon-description/pokemon-description.component';
import { PokemonStatChartComponent } from '../../components/pokemon-details/pokemon-stat-chart/pokemon-stat-chart.component';
import { PokemonAboutComponent } from '../../components/pokemon-details/pokemon-about/pokemon-about.component';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    LottieComponent,
    PanelModule,
    PokemonDescriptionComponent,
    PokemonStatChartComponent,
    PokemonAboutComponent,
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss',
})
export class PokemonDetailsComponent {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  private router = inject(Router);

  pokemonName = toSignal(
    this.route.params.pipe(map((params) => params['name']))
  );

  monster = toSignal(
    this.pokemonService.getPokemonByName(this.pokemonName()).pipe(
      tap((pokemon) => {
        if (!pokemon) {
          this.router.navigate(['not-found']);
        }
      })
    )
  );

  constructor() {}
}
