import { TestBed } from '@angular/core/testing';

import { PokemonAbilityService } from './pokemon-ability.service';

describe('PokemonAbilityService', () => {
  let service: PokemonAbilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonAbilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
