import { Component, input, AfterViewInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { PokemonStats } from '../../../models/pokemon.model';
import { firstLetterUpper } from '../../../utils/format.utils';

@Component({
  selector: 'app-pokemon-stat-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './pokemon-stat-chart.component.html',
  styleUrls: ['./pokemon-stat-chart.component.scss'],
})
export class PokemonStatChartComponent implements AfterViewInit {
  stats = input.required<PokemonStats>();
  monsterName = input.required<string>();
  data: any;
  options: any;

  ngAfterViewInit() {
    setTimeout(() => {
      this.initChart();
    }, 0);
  }

  initChart() {
    this.options = {
      scales: {
        r: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: {
          display: true,
          text: `Statistics of ${firstLetterUpper(this.monsterName())}`,
          font: {
            size: 20,
          },
        },
      },
    };

    this.data = {
      labels: [
        'HP',
        'Attack',
        'Defense',
        'Special Attack',
        'Special Defense',
        'Speed',
      ],
      datasets: [
        {
          data: this.getStatsValues(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
        },
      ],
    };
  }

  getStatsValues(): number[] {
    const { hp, attack, defense, specialAttack, specialDefense, speed } =
      this.stats();
    return [hp, attack, defense, speed, specialAttack, specialDefense];
  }
}
