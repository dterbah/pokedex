export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface Pokemon {
  name: string;
  id: number;
  baseExperience: number;
  cryUrl: string;
  description: string;
  types: string[];
  stats: PokemonStats;
  sprites: {
    back: string;
    backShiny: string;
    front: string;
    frontShiny: string;
  };
}
