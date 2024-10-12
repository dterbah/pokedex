import { inject, Injectable, signal } from '@angular/core';

import { Pokemon, PokemonGenderRatio } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  finalize,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { PokemonResult } from '../result/pokemon.result';
import { getGenderRatio, toPokemon } from '../utils/pokemon.util';
import { LoadingService } from './loading.service';
import { BASE_URL, POKEMON_COUNT, POKEMON_LIMIT } from './constants';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);

  private cache = Array<Pokemon>();

  pokemonCount = signal(1000);

  constructor() {}

  getPokemons(offset: number = 0): Observable<Pokemon[]> {
    const url = `${BASE_URL}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`;
    this.loadingService.start();
    return this.http.get<PokemonResult>(url).pipe(
      map((result: PokemonResult) => {
        console.log('result', result);
        this.pokemonCount.set(result.count);
        return result.results;
      }),
      mergeMap((results) => {
        const pokemonDetailsRequests = results.map(
          (result) => this.getPokemonByName(result.name) as Observable<Pokemon>
        );

        return forkJoin(pokemonDetailsRequests);
      }),
      finalize(() => this.loadingService.stop())
    );
  }

  getPokemonByName(name: string | number): Observable<Pokemon | undefined> {
    const url = `${BASE_URL}/pokemon/${name}`;
    // try to find the pokemon in the cache
    const existingPokemon = this.cache.find((pokemon) => pokemon.name === name);
    if (existingPokemon) {
      return of(existingPokemon);
    }

    this.loadingService.start();
    return this.http.get<any>(url).pipe(
      switchMap((pokemon) =>
        // add the description in the data
        this.getPokemonSpeciesData(pokemon.name).pipe(
          map((data) => {
            const pokemonWithDescription = { ...pokemon, ...data };
            return toPokemon(pokemonWithDescription);
          })
        )
      ),
      tap((pokemon) => {
        this.cache.push(pokemon);
      }),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      }),
      finalize(() => this.loadingService.stop())
    );
  }

  private getPokemonSpeciesData(
    name: string
  ): Observable<{ description: string; gender: PokemonGenderRatio }> {
    const url = `${BASE_URL}/pokemon-species/${name}`;

    return this.http.get<any>(url).pipe(
      map((species) => {
        const flavorTextEntry = species.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );

        return {
          description:
            flavorTextEntry?.flavor_text ?? 'Description not available',
          gender: getGenderRatio(species.gender_rate ?? 0),
        };
      })
    );
  }
}
