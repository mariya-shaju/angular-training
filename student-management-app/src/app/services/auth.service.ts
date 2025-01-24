import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage';
import { IStudent } from '../types/student.type';
import { studentsList } from '../../data';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'studentsList';

  constructor(private localStorageService: LocalStorageService) {
    // Initialize with studentsList if not present in localStorage
    if (!this.localStorageService.getItem<IStudent[]>(this.STORAGE_KEY)) {
      this.localStorageService.setItem(this.STORAGE_KEY, studentsList);
    }
  }

  login(username: string, password: string): IStudent | null {
    const students = this.localStorageService.getItem<IStudent[]>(
      this.STORAGE_KEY
    );
    return (
      students?.find(
        (student) =>
          student.username === username && student.password === password
      ) || null
    );
  }

  register(newStudent: IStudent): void {
    const students =
      this.localStorageService.getItem<IStudent[]>(this.STORAGE_KEY) || [];
    students.push(newStudent);
    this.localStorageService.setItem(this.STORAGE_KEY, students);
  }

  // getStudents(): IStudent[] {
  //   return this.localStorageService.getItem<IStudent[]>(this.STORAGE_KEY) || [];
  // }
}
