import { Component, computed, effect, inject, signal } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginatorModule } from 'primeng/paginator';

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
    PaginatorModule,
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

  // paginator
  rows = signal(10);
  first = signal(0);
  totalRecords = computed(() => this.objects()?.length);

  displayedItems = computed(() => {
    return this.objects()?.slice(this.first(), this.rows() + this.first());
  });

  constructor() {
    effect(() => {
      console.log(this.displayedItems());
    });
  }

  addToCart(itemName: string) {
    if (!this.objectsQuantities[itemName]) {
      this.objectsQuantities[itemName] = 1;
    } else {
      this.objectsQuantities[itemName]++;
    }
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }
}
