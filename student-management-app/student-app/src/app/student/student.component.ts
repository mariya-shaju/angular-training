import { Component, OnInit } from '@angular/core';
import { Student } from '../types/student.types';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MarkStatusTransformationPipe } from '../pipes/mark.pipe';
import { GradeTransformationPipe } from '../pipes/grade.pipe';
import { LocalStorageService } from '../services/local-storage.service';
import { STUDENTS_KEY, USER_KEY } from '../../consts';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { StudentsService } from '../services/student.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-student',
  imports: [
    MatTableModule,
    NavbarComponent,
    MarkStatusTransformationPipe,
    GradeTransformationPipe],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'class',
    'totalMarks',
    'status',
    'actions',
  ];
  dataSource: Student[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    private studentservice: StudentsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const studentsData = this.localStorageService.get(STUDENTS_KEY);
    if (studentsData) {
      this.dataSource = JSON.parse(studentsData);
      console.log(studentsData);
    }
  }
  openDeleteDialog(studentId: string,username:string): void {
    console.log("first")
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { id: studentId ,username: username },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteStudent(studentId,username);
      }
    });
  }

  deleteStudent(studentId: string,username:string): void {
    const loggedInUserId = this.localStorageService.get(USER_KEY); // Get logged-in user ID

    this.studentservice.deleteById(studentId);
    this.dataSource = this.studentservice.getAll();


    if (username === loggedInUserId) {
      this.localStorageService.remove(USER_KEY);
      this.router.navigate(['/login']);
    }
  }

  navigateToEdit(studentId: string): void {
    this.router.navigate(['/edit', studentId]); // Navigate to edit page with student ID
  }
}
