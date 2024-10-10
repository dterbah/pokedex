import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, tap } from 'rxjs';
import { BASE_URL } from './constants';

@Injectable({
  providedIn: 'root',
})
export class PokemonTypeService {
  private http = inject(HttpClient);

  constructor() {}

  getTypeSprites(typeNames: string[]): Observable<string[]> {
    const requests = typeNames.map((typeName) => {
      const url = `${BASE_URL}/type/${typeName}`;
      return this.http
        .get<any>(url)
        .pipe(
          map(
            (type) => type.sprites['generation-iii'].emerald.name_icon as string
          )
        );
    });

    return forkJoin(requests);
  }
}
