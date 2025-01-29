import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { StudentComponent } from './student/student.component';
import { authGuard } from './guard/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent, data: { mode: 'signup' } },
  { path: 'students', component: StudentComponent ,canActivate:[authGuard]},
  { path: 'edit/:id', component: SignupComponent,data: { mode: 'editStudent'} ,canActivate:[authGuard]},
  { path: 'add-new-student', component: SignupComponent, data: { mode: 'addStudent' },canActivate:[authGuard]
  },
];
