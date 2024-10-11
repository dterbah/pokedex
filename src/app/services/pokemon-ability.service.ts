import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from './constants';
import { forkJoin, map, Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonAbilityService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  constructor() {}

  getAbilitiesDescriptions(
    abilities: string[]
  ): Observable<{ name: string; description: string }[]> {
    this.loadingService.start();
    const requests = abilities.map((ability) => {
      const url = `${BASE_URL}/ability/${ability}`;

      return this.http.get<any>(url).pipe(
        map((abilityContent) => {
          const abilityDescription = abilityContent.effect_entries.find(
            (effect: any) => effect.language.name === 'en'
          );

          return {
            name: ability,
            description: abilityDescription.effect,
          };
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
