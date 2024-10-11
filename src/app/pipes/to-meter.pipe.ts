import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toMeter',
  standalone: true,
})
export class ToMeterPipe implements PipeTransform {
  transform(value: number): string {
    return `${(value / 100).toFixed(2)} m`;
  }
}
