export interface PokemonMove {
  name: string;
  accuracy: number;
  power: number;
  pp: number;
  generation: string;
  type: {
    name: string;
    url: string;
  };
}
