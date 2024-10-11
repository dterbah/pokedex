import { Pipe, PipeTransform } from '@angular/core';
import { firstLetterUpper } from '../utils/format.utils';

@Pipe({
  name: 'firstLetterUpper',
  standalone: true,
})
export class FirstLetterUpperPipe implements PipeTransform {
  transform(value: string): string {
    return firstLetterUpper(value);
  }
}
