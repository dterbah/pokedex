import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replaceDashWithSpace',
  standalone: true,
})
export class ReplaceDashWithSpacePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/-/g, ' ');
  }
}
