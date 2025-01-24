import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'grade',
})
export class GradeTransformationPipe implements PipeTransform {
  transform(value: number): string {
    let grade: string;

    if (value == 1) grade = `${value}st grade`;
    else if (+value < 10) grade = `${value}nd grade`; // greater than 1
    else grade = `${value}th grade`; // greater than 10

    return grade;
  }
}
