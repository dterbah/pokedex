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

  private cache: Map<string, string> = new Map();

  constructor() {}

  getTypeSprites(typeNames: string[]): Observable<string[]> {
    this.loadingService.start();
    const requests = typeNames.map((typeName) => {
      const url = `${BASE_URL}/type/${typeName}`;
      const existingType = this.cache.get(typeName);
      if (existingType) {
        return of(existingType);
      }

      return this.http.get<any>(url).pipe(
        map(
          (type) =>
            type.sprites['generation-viii']['sword-shield'].name_icon as string
        ),
        tap((typeUrl) => {
          this.cache.set(typeName, typeUrl);
        }),
        catchError((error) => {
          console.error(`Error fetching type: ${typeName}`, error);
          return of('');
        })
      );
    });

    return forkJoin(requests).pipe(
      tap(() => {
        this.loadingService.end();
      })
    );
  }
}
