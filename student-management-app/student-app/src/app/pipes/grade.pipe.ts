import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'grade',
})
export class GradeTransformationPipe implements PipeTransform {
  transform(value: number): string {
    let grade: string;

    if (value == 1) grade = `${value}st grade`;
    else if (value==2)grade = `${value}nd grade`
    else if (value==3)grade = `${value}rd grade`
    else grade = `${value}th grade`;
    return grade;
  }
}
