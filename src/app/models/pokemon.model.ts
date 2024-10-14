export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

export interface PokemonDetails {
  baseExperience: number;
  height: number; // cm
  weight: number;
}

export interface PokemonGenderRatio {
  male: number;
  female: number;
}

export interface Pokemon {
  name: string;
  id: number;
  cryUrl: string;
  description: string;
  types: string[];
  stats: PokemonStats;
  details: PokemonDetails;
  gender: PokemonGenderRatio;
  moves: string[];
  abilities: { hidden: boolean; name: string }[];
  sprites: {
    back: string;
    backShiny: string;
    front: string;
    frontShiny: string;
  };
}
