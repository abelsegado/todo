import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sino',
  standalone: true
})
export class SinoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): string {
    return value ? 'Completada' : 'Pendiente';
  }

}
