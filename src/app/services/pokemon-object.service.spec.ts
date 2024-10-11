import { TestBed } from '@angular/core/testing';

import { PokemonObjectService } from './pokemon-object.service';

describe('PokemonObjectService', () => {
  let service: PokemonObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
