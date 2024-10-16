import { Component, computed, effect, input } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

import { FirstLetterUpperPipe } from '../../../pipes/first-letter-upper.pipe';
import { ReplaceDashWithSpacePipe } from '../../../pipes/replace-dash-with-space.pipe';

export interface ShopCart {
  [itemName: string]: { count: number; cost: number }; // Quantity per item
}

@Component({
  selector: 'app-pokemon-bill',
  standalone: true,
  imports: [QRCodeModule, FirstLetterUpperPipe, ReplaceDashWithSpacePipe],
  templateUrl: './pokemon-bill.component.html',
  styleUrl: './pokemon-bill.component.scss',
})
export class PokemonBillComponent {
  cart = input.required<ShopCart>();
  cartEntries = computed(() => Object.entries(this.cart()));
  total = computed(() => {
    return this.cartEntries().reduce(
      (total, item) => total + item[1].cost * item[1].count,
      0
    );
  });

  qrCodedata = computed(
    () => `TOTAL of your fake Pokemon bill : ${this.total()}$`
  );
}
