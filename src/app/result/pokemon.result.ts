import { Pokemon } from '../models/pokemon.model';

export interface PokemonResult {
  count: number;
  next: string;
  previous: string;
  results: { name: string; url: string }[];
}
