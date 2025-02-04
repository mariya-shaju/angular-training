import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title',
})
export class TitlePipe implements PipeTransform {
  transform(mode: string): string {
    switch (mode) {
      case 'signup':
        return 'Get Started';
      case 'addStudent':
        return 'Add New User';
      default:
        return 'Edit Student Details';
    }
  }
}
