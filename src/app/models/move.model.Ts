export interface PokemonMove {
  id: number;
  name: string;
  accuracy: number | undefined;
  power: number;
  pp: number;
  generation: string;
  type: {
    name: string;
    url: string;
  };
}
