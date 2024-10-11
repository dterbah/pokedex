import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toFoot',
  standalone: true,
})
export class ToFootPipe implements PipeTransform {
  transform(value: number): string {
    return `${((value / 100) * 3.281).toFixed(2)} feet`;
  }
}
