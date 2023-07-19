import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pointsToString'
})
export class PointsToStringPipe implements PipeTransform {
  transform(points?: number[][]): string {
    return points?.map(point => point.join(' ')).join(', ') || '';
  }
}