import {
  Component,
  computed,
  effect,
  inject,
  model,
  signal,
} from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { toSignal } from '@angular/core/rxjs-interop';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

import { PokemonObjectService } from '../../services/pokemon-object.service';
import { FirstLetterUpperPipe } from '../../pipes/first-letter-upper.pipe';
import { ReplaceDashWithSpacePipe } from '../../pipes/replace-dash-with-space.pipe';
import {
  PokemonBillComponent,
  ShopCart,
} from '../../components/pokemon-shop/pokemon-bill/pokemon-bill.component';
import { PokemonObject } from '../../models/objet.model';

@Component({
  selector: 'app-pokemon-shop',
  standalone: true,
  imports: [
    DataViewModule,
    ButtonModule,
    DividerModule,
    PaginatorModule,
    InputTextModule,
    FirstLetterUpperPipe,
    ReplaceDashWithSpacePipe,
    PokemonBillComponent,
  ],
  templateUrl: './pokemon-shop.component.html',
  styleUrl: './pokemon-shop.component.scss',
})
export class PokemonShopComponent {
  private objectService = inject(PokemonObjectService);
  objects = toSignal(this.objectService.getObjects());
  objectsQuantities = signal<ShopCart>({});

  // search
  search = model('');

  // paginator
  rows = signal(10);
  first = signal(0);

  filteredItems = computed(() => {
    const search = this.search().toLowerCase();

    return (
      this.objects()?.filter((obj) =>
        obj.name.toLowerCase().includes(search)
      ) || []
    );
  });

  displayedItems = computed(() => {
    return this.filteredItems().slice(this.first(), this.rows() + this.first());
  });

  totalRecords = computed(() => this.filteredItems()?.length);

  addToCart(item: PokemonObject) {
    const { name } = item;
    const quantities = this.objectsQuantities();
    if (!quantities[name]) {
      quantities[name] = { count: 1, cost: item.cost };
    } else {
      quantities[name].count++;
    }

    this.objectsQuantities.set({ ...quantities });
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }

  onSearchChange() {
    // reset pagination values
    this.first.set(0);
    this.rows.set(10);
  }
}
