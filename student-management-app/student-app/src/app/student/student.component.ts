import { AfterViewInit, Component, DoCheck, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Student } from '../types/student.types';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { MarkStatusTransformationPipe } from '../pipes/mark.pipe';
import { GradeTransformationPipe } from '../pipes/grade.pipe';
import { LocalStorageService } from '../services/local-storage.service';
import { STUDENTS_KEY, USER_KEY } from '../../consts';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { StudentsService } from '../services/student.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs';
import {merge, Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-student',
  imports: [
    MatTableModule,
    NavbarComponent,
    MarkStatusTransformationPipe,
    GradeTransformationPipe,
    MatPaginator],
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


  resultsLength = 0
  itemsPerPage = 5
  pageNumber = 0
  dataSource:Student[] = [];
  dataSourceFiltered: Student[] = []

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
      this.resultsLength = this.dataSource.length
      this.dataSourceFiltered = this.dataSource.slice(this.pageNumber*this.itemsPerPage,( this.pageNumber*this.itemsPerPage) + this.itemsPerPage)

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

  deleteStudent(studentId: string, username: string): void {
    const loggedInUserId = this.localStorageService.get(USER_KEY); // Get logged-in user ID

    this.studentservice.deleteById(studentId);

    // Wrap the data from studentservice.getAll() into MatTableDataSource
    const updatedStudents = this.studentservice.getAll();
    this.dataSource = updatedStudents;
    this.dataSourceFiltered =updatedStudents.slice(this.pageNumber*this.itemsPerPage,( this.pageNumber*this.itemsPerPage) + this.itemsPerPage)

    if (username === loggedInUserId) {
      this.localStorageService.remove(USER_KEY);
      this.router.navigate(['/login']);
    }
  }

  navigateToEdit(studentId: string): void {
    this.router.navigate(['/edit', studentId]); // Navigate to edit page with student ID
  }

  handlePageChange(pagination: any){
    this.itemsPerPage = pagination.pageSize;
    this.pageNumber = pagination.pageIndex;
    this.dataSourceFiltered = this.dataSource.slice(this.pageNumber*this.itemsPerPage,( this.pageNumber*this.itemsPerPage) + this.itemsPerPage)
  }
}
