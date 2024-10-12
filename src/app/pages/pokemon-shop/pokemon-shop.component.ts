import { Component, inject } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { toSignal } from '@angular/core/rxjs-interop';

import { PokemonObjectService } from '../../services/pokemon-object.service';
import { FirstLetterUpperPipe } from '../../pipes/first-letter-upper.pipe';
import { ReplaceDashWithSpacePipe } from '../../pipes/replace-dash-with-space.pipe';

@Component({
  selector: 'app-pokemon-shop',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    DividerModule,
    FirstLetterUpperPipe,
    ReplaceDashWithSpacePipe,
  ],
  templateUrl: './pokemon-shop.component.html',
  styleUrl: './pokemon-shop.component.scss',
})
export class PokemonShopComponent {
  private objectService = inject(PokemonObjectService);

  objects = toSignal(this.objectService.getObjects());

  objectsQuantities: any = {};

  addToCart(itemName: string) {
    if (!this.objectsQuantities[itemName]) {
      this.objectsQuantities[itemName] = 1;
    } else {
      this.objectsQuantities[itemName]++;
    }
  }
}
