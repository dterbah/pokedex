import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetterUpper',
  standalone: true
})
export class FirstLetterUpperPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
