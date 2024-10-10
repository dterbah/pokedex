import { inject, Injectable, signal } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable, of, tap } from 'rxjs';
import { PokemonResult } from '../result/pokemon.result';
import { toPokemon } from '../utils/pokemon.util';

const POKEMON_LIMIT = 9;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  private cache = Array<Pokemon>();

  pokemonCount = signal(0);

  constructor() {}

  getPokemons(offset: number = 0): Observable<Pokemon[]> {
    const url = `${PokemonService.BASE_URL}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`;
    return this.http.get<PokemonResult>(url).pipe(
      map((result: PokemonResult) => {
        this.pokemonCount.set(result.count);
        return result.results;
      }),
      mergeMap((results) => {
        const pokemonDetailsRequests = results.map((result) =>
          this.getPokemonByName(result.name)
        );

        return forkJoin(pokemonDetailsRequests);
      })
    );
  }

  getPokemonByName(name: string): Observable<Pokemon> {
    const url = `${PokemonService.BASE_URL}/pokemon/${name}`;
    // try to find the pokemon in the cache
    const existingPokemon = this.cache.find((pokemon) => pokemon.name === name);
    if (existingPokemon) {
      return of(existingPokemon);
    }

    return this.http.get<any>(url).pipe(
      map((pokemon) => toPokemon(pokemon)),
      tap((pokemon) => {
        this.cache.push(pokemon);
      })
    );
  }
}
