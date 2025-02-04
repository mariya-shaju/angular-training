import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../types/student.types';
import { StudentsService } from './students.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private studentService: StudentsService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  initAuth(): void {
    // Check if there is a logged-in user set in StudentsService
    const currentUser = this.studentService.getCurrentuser();
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
  }

  login(
    username: string,
    password: string
  ): { success: boolean; message: string } {
    const students = this.studentService.getAll();

    const student = students.find((item) => item.username === username);

    if (student) {
      if (student.password === password) {
        localStorage.setItem('userId', student.id.toString());
        localStorage.setItem('username', student.username);
        return { success: true, message: 'Login Success' };
      } else {
        this.showToast('Password not matching', 'error');
        return { success: false, message: 'Password not matching' };
      }
    }

    this.showToast('Student not found', 'error');
    return { success: false, message: 'Student not found' };
  }

  getLoggedInUser(): Student |null {
    const username = localStorage.getItem('username');
    const userid = localStorage.getItem('userId');

    if (username && userid) {
     const user = this.studentService.getById(userid)
        return user;
    } else {

        return  null
    }
}


  authorize(): { success: boolean; message: string } {
    const currentUser = this.studentService.getCurrentuser();

    if (!currentUser) {
      this.router.navigate(['/login']);
      return { success: false, message: 'Unauthorized access. Redirecting to login.' };
    }

    return { success: true, message: 'Authorized successfully' };
  }

  logout(): void {
    try {
      this.studentService.setCurrentuser(null); // Clear the user from StudentsService
      this.showToast('Logged out successfully!', 'success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
    } catch (error) {
      console.error('Logout failed:', error);
      this.showToast('Logout failed! Please try again.', 'error');
    }
  }

  register(student: Student): void {
    this.studentService.add(student); // Add the student to the list
    this.showToast('Registration successful!', 'success');
    console.log('New student added:', student);
  }

  private showToast(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }
}

