import { Pokemon } from '../models/pokemon.model';

export const toPokemon = (data: any): Pokemon => {
  const { name, sprites } = data;

  return {
    name,
    sprites: {
      back: sprites.back_default,
      front: sprites.front_default,
      backShiny: sprites.back_shiny,
      frontShiny: sprites.front_shiny,
    },
  };
};
