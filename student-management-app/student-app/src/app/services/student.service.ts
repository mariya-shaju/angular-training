import { Injectable } from '@angular/core';
import { Student } from '../types/student.types';
import { STUDENTS_KEY } from '../../consts';
import { LocalStorageService } from './local-storage.service';
import { studentsList } from '../../student.data';


@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  _students: Student[] = [];
  _user: Student | null = null;
  constructor(private localstorage: LocalStorageService) {}

  initStudents() {
    const value = this.localstorage.get(STUDENTS_KEY);
    console.log('Students in localStorage:', value);

    if (!value || value === '[]') {
      this._students = studentsList; // Use predefined studentsList
      this.localstorage.set(STUDENTS_KEY, JSON.stringify(this._students));
      console.log('Initialized with predefined studentsList:', studentsList);
    } else {
      this._students = JSON.parse(value); // Load students from localStorage
      console.log('Loaded students from localStorage:', this._students);
    }
  }
setCurrentuser(user:Student | null){
  this._user=user
}
  findByUsername(username: string): Student | null {
    const student = this._students.find(
      (student) => student.username == username
    );
    return student || null;
  }
  getCurrentuser(){
    return this._user
  }

  getAll(): Student[] {
    return this._students;
  }

  add(student: Student): Student[] {
    this._students.unshift(student);
    this.localstorage.set(STUDENTS_KEY, this._students);
    return this._students;
  }

  getById(id: string): Student | null {
    const student = this._students.find((student) => student.id === id);
    return student || null;
  }

  deleteById(id: string) {
    this._students = this._students.filter((student) => student.id !== id);
    this.localstorage.set(STUDENTS_KEY, this._students);
  }

  update(id: string, updatedStudent: Student): void {
    const index = this._students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this._user =updatedStudent
      this._students[index] = updatedStudent;
      this.localstorage.set(STUDENTS_KEY, JSON.stringify(this._students));
    }
  }

}
