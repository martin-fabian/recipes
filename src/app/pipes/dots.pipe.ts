import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dots'
})

export class DotsPipe implements PipeTransform {
  transform(value: any, num: number): any {
    return value.substr(0, num) + '...';
  }
}
