import { TestBed } from '@angular/core/testing';

import { PokemonMovesTsService } from './pokemon-moves.ts.service';

describe('PokemonMovesTsService', () => {
  let service: PokemonMovesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonMovesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
