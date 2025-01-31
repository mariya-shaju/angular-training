import { Component, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../shared/button/button.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Student } from '../../types/student.types';
import { v4 as uuidv4 } from 'uuid';
import { AuthService } from '../../services/auth.service';
import { StudentsService } from '../../services/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    AuthComponent,
    MatStepperModule,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private studentservice: StudentsService,
    private snackBar: MatSnackBar
  ) {}
  studentId: string | null = null;
  isLinear = false;
  buttonName="Sign Up"
  mode: string = 'signup'; // Default mode is signup

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.route.data.subscribe((data) => {
      this.mode = data['mode'] || 'signup';
    });

    if (this.mode === 'editStudent' && this.studentId) {
      const student = this.studentservice.getById(this.studentId);
      if (student) {
        this.basicDetails.patchValue({
          name: student.name,
          age: student.age.toString(),
          username: student.username,
          class: student.class.toString(),
          maths: student.marks.math.toString(),
          english: student.marks.english.toString(),
          science: student.marks.science.toString(),
          password: student.password,
          confirmPassword: student.password,
        });
      }
    }
  }
  buttonNameFunc(): string | undefined {
    if (this.mode === 'signup') {
      return 'Sign Up';
    } else if (this.mode === 'addStudent') {
      return 'Add';
    } else {
      return 'Update';
    }
  }
  titleFunc(): string | undefined {
    if (this.mode === 'signup') {
      return 'Get Started';
    } else if (this.mode === 'addStudent') {
      return 'Add New User';
    } else {
      return 'Edit Student Details';
    }
  }

  basicDetails = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(20),
        Validators.pattern('^[0-9]+$')
      ]),

      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),

      ]),
      class: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(12),
        Validators.pattern('^[0-9]+$')
      ]),
      maths: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-9]+$')
      ]),
      english: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-9]+$')
      ]),
      science: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
        Validators.pattern('^[0-9]+$')
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.matchPasswords() }
  );
  matchPasswords(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;

      return password === confirmPassword ? null : { mismatch: true };
    };
  }
  onSubmit() {
    if (!this.basicDetails.valid) {
      this.showToast('Please fill in all required fields correctly.', 'error');
      return;
    }

    try {
      const student = {
        id: this.studentId ? this.studentId : uuidv4(),
        name: this.basicDetails.value.name!,
        username: this.basicDetails.value.username!,
        class: +this.basicDetails.value.class!,
        age: +this.basicDetails.value.age!,
        marks: {
          math: +this.basicDetails.value.maths!,
          english: +this.basicDetails.value.english!,
          science: +this.basicDetails.value.science!,
        },
        password: this.basicDetails.value.password!,
        totalMarks: this.getTotalMarks(),
      };

      if (this.mode === 'signup') {
        this.authService.register(student);
        this.showToast('Signup successful! Redirecting to login...', 'success');
        this.router.navigate(['/login']);
      } else if (this.mode === 'addStudent') {
        this.studentservice.add(student);
        this.showToast('Student added successfully!', 'success');
        this.router.navigate(['/students']);
      } else if (this.mode === 'editStudent') {
        this.studentservice.update(student.id, student);
        this.showToast('Student updated successfully!', 'success');
        this.router.navigate(['/students']);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      this.showToast('An unexpected error occurred. Please try again.', 'error');
    }
  }
  showToast(message: string, type: 'success' | 'error' | 'warning' = 'success') {
    let panelClass = type === 'success' ? 'success-snackbar' : 'error-snackbar';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [panelClass],
    });
  }

  getTotalMarks() {
    return (
      +this.basicDetails.value.maths! +
      +this.basicDetails.value.english! +
      +this.basicDetails.value.science!
    );
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

}
