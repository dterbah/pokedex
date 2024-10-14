import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, finalize, switchMap, of, tap } from 'rxjs';
import { PokemonObject } from '../models/objet.model';
import { LoadingService } from './loading.service';
import { BASE_URL } from './constants';

const OBJECTS_STORAGE_KEY = 'objects';
const OBJECT_LIMIT = 500;

@Injectable({
  providedIn: 'root',
})
export class PokemonObjectService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  constructor() {}

  getObjects(): Observable<PokemonObject[]> {
    // try to find objects in the local storage
    const existingObjects = localStorage.getItem(OBJECTS_STORAGE_KEY);
    if (existingObjects) {
      return of(JSON.parse(existingObjects) as PokemonObject[]);
    }

    const url = `${BASE_URL}/item/?offset=0&limit=${OBJECT_LIMIT}`;
    this.loadingService.start();

    return this.http.get<any>(url).pipe(
      map((response) =>
        response.results.map((object: { name: string }) => object.name)
      ),
      switchMap((objectNames: string[]) => {
        const requests = objectNames.map((name) => this.getObjectDetails(name));
        return forkJoin(requests);
      }),
      tap((objects) => {
        localStorage.setItem(OBJECTS_STORAGE_KEY, JSON.stringify(objects));
      }),
      finalize(() => {
        this.loadingService.stop();
      })
    );
  }

  private getObjectDetails(objectName: string): Observable<PokemonObject> {
    const url = `${BASE_URL}/item/${objectName}`;

    return this.http.get<any>(url).pipe(
      map((details) => {
        const flavorTextEntry = details.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );

        return {
          category: details.category.name,
          cost: details.cost,
          description: flavorTextEntry ? flavorTextEntry.text : '',
          imgUrl: details.sprites.default,
          name: objectName,
        };
      })
    );
  }
}
