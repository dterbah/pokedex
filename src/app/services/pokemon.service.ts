import { inject, Injectable, signal } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import {
  catchError,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { PokemonResult } from '../result/pokemon.result';
import { toPokemon } from '../utils/pokemon.util';
import { LoadingService } from './loading.service';
import { BASE_URL, POKEMON_LIMIT } from './constants';
import { PokemonTypeService } from './pokemon-type.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);
  private isLoadingService = inject(LoadingService);
  private typeService = inject(PokemonTypeService);

  private cache = Array<Pokemon>();

  pokemonCount = signal(0);

  constructor() {}

  getPokemons(offset: number = 0): Observable<Pokemon[]> {
    const url = `${BASE_URL}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`;
    this.isLoadingService.start();
    return this.http.get<PokemonResult>(url).pipe(
      map((result: PokemonResult) => {
        this.pokemonCount.set(result.count);
        return result.results;
      }),
      mergeMap((results) => {
        const pokemonDetailsRequests = results.map(
          (result) => this.getPokemonByName(result.name) as Observable<Pokemon>
        );

        return forkJoin(pokemonDetailsRequests);
      }),
      tap(() => this.isLoadingService.end())
    );
  }

  getPokemonByName(name: string): Observable<Pokemon | undefined> {
    const url = `${BASE_URL}/pokemon/${name}`;
    // try to find the pokemon in the cache
    const existingPokemon = this.cache.find((pokemon) => pokemon.name === name);
    if (existingPokemon) {
      return of(existingPokemon);
    }

    this.isLoadingService.start();
    return this.http.get<any>(url).pipe(
      switchMap((pokemon) =>
        // add the description in the data
        this.getPokemonSpeciesDescription(pokemon.name).pipe(
          map((description) => {
            const pokemonWithDescription = { ...pokemon, description };
            return toPokemon(pokemonWithDescription);
          })
        )
      ),
      tap((pokemon) => {
        this.cache.push(pokemon);
      }),
      tap(() => {
        this.isLoadingService.end();
      }),
      catchError((error) => {
        console.log(error);
        this.isLoadingService.end();
        return of(undefined);
      })
    );
  }

  private getPokemonSpeciesDescription(name: string): Observable<string> {
    const url = `${BASE_URL}/pokemon-species/${name}`;

    return this.http.get<any>(url).pipe(
      map((species) => {
        const flavorTextEntry = species.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        return flavorTextEntry
          ? flavorTextEntry.flavor_text
          : 'Description not available';
      })
    );
  }
}
