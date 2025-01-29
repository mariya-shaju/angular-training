import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentsService } from './services/student.service';
import { AuthService } from './services/auth.service';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'student-management';

  constructor(
    private appService: AppService,
    private studentsService: StudentsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // fetch all data from db
    this.studentsService.initStudents(); // get students first, then only can collect authenticated user
    this.authService.initAuth(); // after collecting students, get authorization;
  }

  isAuthRoute() {
    const currentUrl = this.appService.getCurrentUrl();
    return currentUrl == '/login' || currentUrl == '/signup';
  }
}