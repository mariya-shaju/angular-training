import { Injectable } from '@angular/core';
import { Student } from '../types/student.types';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { studentsList } from '../../student.data';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  getCurrentuser() {
    return this._user;
  }
  setCurrentuser(user:Student | null) {
    this._user=user;
    if(user==null){
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
 }
  }
  private _students: Student[] = [];
  private _user: Student | null = null;
  private studentsSubject = new BehaviorSubject<Student[]>(this._students);


  initStudents() {
    this._students = studentsList

  }

  getAll(): Student[] {
    return this._students;
  }
  getAllStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }
    getById(id: string): Student | null {
    const student = this._students.find((student) => student.id === id);
    return student || null;
  }

 add(student: Student): void {
    this._students.unshift(student);

  }

  deleteById(id: string): void {
    this._students = this._students.filter((student) => student.id !== id);

  }

  update(id: string, updatedStudent: Student): void {
    const index = this._students.findIndex((student) => student.id === id);
    if (index !== -1) {
      this._students[index] = updatedStudent;

    }
  }
  deleteStudent(studentId: string): Observable<void> {
    this._students = this._students.filter((student) => student.id !== studentId);
    this.studentsSubject.next(this._students);
    return of();
  }


}
