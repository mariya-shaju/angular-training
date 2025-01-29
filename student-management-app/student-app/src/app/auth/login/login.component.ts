import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from '../auth.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    AuthComponent,
    RouterModule,
    ButtonComponent,
    RouterLink,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,private snackBar: MatSnackBar
  ) {}
  loginDetails = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),

    password: new FormControl('', Validators.required),
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  onSubmit() {
    if (this.loginDetails.valid) {
      const { username, password } = this.loginDetails.value;
      console.log('Attempting login with username:', username, 'and password:', password);

      try {
        const loginResponse = this.authService.login(username!, password!);
        console.log('Login response:', loginResponse);

        if (loginResponse.success) {
          console.log('Login Successful:', loginResponse.message);
          this.snackBar.open('Login Successful!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['/students']);
        } else {
          this.snackBar.open(loginResponse.message, 'Close', { duration: 3000 });
          this.errorMessage = loginResponse.message;
        }
      } catch (error) {
        console.error('Authentication Error:', error);
        this.snackBar.open('An unexpected error occurred. Please try again.', 'Close', { duration: 3000 });
        this.errorMessage = 'An unexpected error occurred. Please try again.';
      }
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', { duration: 3000 });
      this.errorMessage = 'Please fill in all required fields.';
    }
  }
}



