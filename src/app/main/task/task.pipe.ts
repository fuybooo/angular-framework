import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statePipe'
})
export class StatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let res = '';
    switch (value) {
      case 1:
        res = '<i class="anticon anticon-exclamation-circle-o"></i>';
        break;
      default:
        break;
    }
    return res;
  }

}
