import { Component, effect, inject } from '@angular/core';
import { PokemonObjectService } from '../../services/pokemon-object.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-shop',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-shop.component.html',
  styleUrl: './pokemon-shop.component.scss',
})
export class PokemonShopComponent {
  private objectService = inject(PokemonObjectService);

  objects = toSignal(this.objectService.getObjects());

  constructor() {
    effect(() => {
      console.log(this.objects());
    });
  }
}
