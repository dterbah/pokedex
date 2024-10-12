import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonBillComponent } from './pokemon-bill.component';

describe('PokemonBillComponent', () => {
  let component: PokemonBillComponent;
  let fixture: ComponentFixture<PokemonBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
