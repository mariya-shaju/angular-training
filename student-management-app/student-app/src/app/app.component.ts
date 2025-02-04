import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsService } from './services/students.service';

// import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'student-management';

  constructor(

    private studentsService: StudentsService,

  ) {}

  ngOnInit(): void {
  this.studentsService.initStudents();}



}
