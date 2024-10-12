import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonQuizzComponent } from './pokemon-quizz.component';

describe('PokemonQuizzComponent', () => {
  let component: PokemonQuizzComponent;
  let fixture: ComponentFixture<PokemonQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonQuizzComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
