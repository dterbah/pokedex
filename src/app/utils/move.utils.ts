import { PokemonMove } from '../models/move.model';

const TYPE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/';

export const toMove = (data: any): PokemonMove => {
  // extract type id to find the url
  const { name, url } = data.type;
  const match = url.match(/\/(\d+)\//);
  const typeId = match[1];

  return {
    name: data.name,
    accuracy: data.accuracy,
    power: data.power,
    pp: data.pp,
    id: data.id,
    generation: data.generation.name,
    type: {
      name,
      url: `${TYPE_BASE_URL}/${typeId}.png`,
    },
  };
};
