export interface Pokemon {
  name: string;
  id: number;
  baseExperience: number;
  cryUrl: string;
  description: string;
  types: string[];
  sprites: {
    back: string;
    backShiny: string;
    front: string;
    frontShiny: string;
  };
}
