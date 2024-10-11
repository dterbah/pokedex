import { Pokemon, PokemonGenderRatio } from '../models/pokemon.model';

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
    height,
    weight,
    gender,
  } = data;

  return {
    name,
    id,
    cryUrl: cries.latest,
    description,
    abilities: abilities.map((ability: any) => {
      return {
        hidden: ability.is_hidden,
        name: ability.ability.name,
      };
    }),
    details: {
      baseExperience: base_experience,
      height: height * 10,
      weight,
    },
    stats: {
      hp: stats[0].base_stat,
      attack: stats[1].base_stat,
      defense: stats[2].base_stat,
      specialAttack: stats[3].base_stat,
      specialDefense: stats[4].base_stat,
      speed: stats[5].base_stat,
    },
    types: types.map((type: any) => type.type.name),
    sprites: {
      back: sprites.back_default,
      front: sprites.front_default,
      backShiny: sprites.back_shiny,
      frontShiny: sprites.front_shiny,
    },
    gender,
  };
};

export const getGenderRatio = (genderRate: number): PokemonGenderRatio => {
  return {
    male: ((8 - genderRate) / 8) * 100,
    female: (genderRate / 8) * 100,
  };
};
