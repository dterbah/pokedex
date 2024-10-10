import { inject, Injectable, signal } from '@angular/core';

import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PokemonResult } from '../result/pokemon.result';

const POKEMON_LIMIT = 10;

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  pokemonCount = signal(0);

  constructor() {}

  getPokemons(offset: number = 0): Observable<Pokemon[]> {
    const url = `${PokemonService.BASE_URL}/pokemon?limit=${POKEMON_LIMIT}&offset=${offset}`;
    return this.http.get<PokemonResult>(url).pipe(
      map((result: PokemonResult) => {
        this.pokemonCount.set(result.count);

        return result.results as Pokemon[];
      })
    );
  }
}
