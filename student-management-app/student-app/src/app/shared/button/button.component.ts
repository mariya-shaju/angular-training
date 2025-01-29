import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonClasses, ButtonVariants } from '../../types/button.types';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() variant: ButtonVariants = 'primary';
  @Input() classList: ButtonClasses[] = [];
  @Input() styles: object = {};
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Output() click= new EventEmitter<void>()

  handleclick(){
    this.click.emit()
  }
}
