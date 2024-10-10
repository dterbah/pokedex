import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpper',
  standalone: true,
})
export class FirstLetterUpperPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(0, 1).toLocaleUpperCase() + value.substring(1);
  }
}
