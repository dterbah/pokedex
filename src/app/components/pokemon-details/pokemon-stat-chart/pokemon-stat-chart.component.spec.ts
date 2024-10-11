import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonStatChartComponent } from './pokemon-stat-chart.component';

describe('PokemonStatChartComponent', () => {
  let component: PokemonStatChartComponent;
  let fixture: ComponentFixture<PokemonStatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonStatChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonStatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
