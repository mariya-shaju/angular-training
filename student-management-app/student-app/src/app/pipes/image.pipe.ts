import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(mode: string): string {
    switch (mode) {
      case 'signup':
        return 'assets/images/authimage.jpg';
      case 'addStudent':
        return 'assets/images/add.jpg';
      default:
        return 'assets/images/edit.jpg';
    }
  }
}
