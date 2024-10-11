import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonSwitchComponent } from './pokemon-switch.component';

describe('PokemonSwitchComponent', () => {
  let component: PokemonSwitchComponent;
  let fixture: ComponentFixture<PokemonSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonSwitchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
