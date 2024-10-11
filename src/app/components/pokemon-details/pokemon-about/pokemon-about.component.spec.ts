import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAboutComponent } from './pokemon-about.component';

describe('PokemonAboutComponent', () => {
  let component: PokemonAboutComponent;
  let fixture: ComponentFixture<PokemonAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAboutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
