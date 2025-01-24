import { Component, Input } from '@angular/core';
import { ButtonClasses, ButtonVariants } from '../../types/button.type';


@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonComponent {
  @Input() variant: ButtonVariants = 'primary';
  @Input() classList: ButtonClasses[] = [];
}
