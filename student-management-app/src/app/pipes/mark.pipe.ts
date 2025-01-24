import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'status',
})
export class MarkStatusTransformationPipe implements PipeTransform {
  transform(value: number): string {
    let status: string;

    if (value < 150) return 'Below Average';
    else if (value >= 150 && value < 239) return 'Average'; // greater than 1
    else return 'Excellent'; // greater than 10
  }
}
