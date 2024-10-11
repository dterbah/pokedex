import { Pokemon } from '../models/pokemon.model';
import { firstLetterUpper } from './format.utils';

export const toPokemon = (data: any): Pokemon => {
  const {
    name,
    sprites,
    id,
    base_experience,
    cries,
    description,
    types,
    stats,
    abilities,
  } = data;

  return {
    name: firstLetterUpper(name),
    id,
    cryUrl: cries.latest,
    description,
    abilities: abilities.map((ability: any) => {
      return {
        hidden: ability.is_hidden,
        name: ability.ability.name,
      };
    }),
    stats: {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      specialAttack: stats[3].base_stat,
      specialDefense: stats[4].base_stat,
      speed: stats[5].base_stat,
    },
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
