import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { BASE_URL } from './constants';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonTypeService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  constructor() {}

  getTypeSprites(typeNames: string[]): Observable<string[]> {
    this.loadingService.start();
    const requests = typeNames.map((typeName) => {
      const url = `${BASE_URL}/type/${typeName}`;
      return this.http.get<any>(url).pipe(
        tap((r) => console.log(r)),
        map(
          (type) =>
            type.sprites['generation-viii']['sword-shield'].name_icon as string
        )
      );
    });

    this.loadingService.end();
    return forkJoin(requests);
  }
}
