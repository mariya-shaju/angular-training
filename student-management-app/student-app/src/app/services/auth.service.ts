import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Student } from '../types/student.types';
import { LocalStorageService } from './local-storage.service';
import { ID, USER_KEY } from '../../consts';
import { StudentsService } from './student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _user: Student | null = null;

  constructor(
    private studentService: StudentsService,
    private localstorage: LocalStorageService,
    private router: Router,private snackBar: MatSnackBar

  ) {}

  initAuth() {
    const value = this.localstorage.get(USER_KEY);
    const students = this.studentService.getAll();
    const student = students.find((item) => item.username == value);
    this._user = student ? student : null;
  }

  login(
    username: string,
    password: string
  ): { success: boolean; message: string } {
    const students = this.studentService.getAll();
    console.log('All students:', students); // Verify all students are fetched

    const student = students.find((item) => item.username === username
    );
    console.log('Found student:', student); // Check if student is found

    if (student) {
      if (student.password === password) {
        this.localstorage.set(USER_KEY, student.username);
        this.localstorage.set(ID, student.id);
        console.log('Stored username in localStorage:', student.username);
        this._user = student;
        // this.router.navigate(['/students']);
        return { success: true, message: 'Login Success' };
      } else {
        console.log('Password mismatch');
        return { success: false, message: 'Password not matching' };
      }
    }

    console.log('Student not found');
    return { success: false, message: 'Student not found' };
  }

  getLoggedInUser(): Student | null {
    console.log(this._user)
    return this._user; // Return the currently logged-in user
  }

  authorize(): { success: boolean; message: string } {
    if (!this._user) {
      const authorization = this.localstorage.get(USER_KEY);
      if (authorization) {
        const student = this.studentService.findByUsername(authorization);
        if (student) {
          this._user = student;
          this.router.navigate(['/students']);
          return { success: true, message: 'Login Success' };
        } else {
          this.router.navigate(['/login']);
          return { success: false, message: 'Student not found' };
        }
      }
      return { success: true, message: 'Login Success' };
    }
    return { success: true, message: 'Login Success' };
  }

  logout() {
    try {
      this._user = null;
      this.localstorage.set(USER_KEY, '');
      this.localstorage.set(ID,'')
      this.showToast('Logged out successfully!', 'success');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

    } catch (error) {
      console.error('Logout failed:', error);
      this.showToast('Logout failed! Please try again.', 'error');
    }
  }
  register(student: Student) {
    this.studentService.add(student);
    console.log('New student added:', student);
  }
  private showToast(message: string, type: 'success' | 'error') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: type === 'success' ? 'success-snackbar' : 'error-snackbar',
    });
  }

}


