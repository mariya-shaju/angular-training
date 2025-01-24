import { Component, inject } from '@angular/core';
import { featherPlus } from '@ng-icons/feather-icons';

import { ButtonComponent } from '../../shared/buttons/buttons.component';
import { GradeTransformationPipe } from '../../pipes/grade.pipe';
import { MarkStatusTransformationPipe } from '../../pipes/mark.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { studentsList } from '../../../data';

@Component({
  selector: 'app-dashboard',
  imports: [ButtonComponent,GradeTransformationPipe,MarkStatusTransformationPipe,NgIcon],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  viewProviders: [provideIcons({ featherPlus })],
})
export class DashboardComponent {
  students = studentsList;
}
