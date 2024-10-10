import { Pokemon } from '../models/pokemon.model';

export const toPokemon = (data: any): Pokemon => {
  const { name, sprites, id, base_experience, cries, description, types } =
    data;

  return {
    name,
    id,
    cryUrl: cries.latest,
    description,
    types: types.map((type: any) => type.type.name),
    baseExperience: base_experience,
    sprites: {
      back: sprites.back_default,
      front: sprites.front_default,
      backShiny: sprites.back_shiny,
      frontShiny: sprites.front_shiny,
    },
  };
};
