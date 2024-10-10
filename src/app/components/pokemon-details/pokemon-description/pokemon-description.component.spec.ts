import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDescriptionComponent } from './pokemon-description.component';

describe('PokemonDescriptionComponent', () => {
  let component: PokemonDescriptionComponent;
  let fixture: ComponentFixture<PokemonDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
