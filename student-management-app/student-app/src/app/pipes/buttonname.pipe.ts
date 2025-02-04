import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'button',
})
export class ButtonPipe implements PipeTransform {
  transform(mode: string): string {
    switch (mode) {
      case 'signup':
        return 'Get Started';
      case 'addStudent':
        return 'Add';
      default:
        return 'Update';
    }
  }
}
