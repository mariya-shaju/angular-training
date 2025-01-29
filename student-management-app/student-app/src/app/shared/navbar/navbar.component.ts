import { Component, OnInit } from '@angular/core';
import { Student } from '../../types/student.types';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private authservice: AuthService) {}
  user: Student | null = null;
  ngOnInit(): void {
    // Retrieve the logged-in user from the AuthService
    this.user = this.authservice.getLoggedInUser();
  }
  logout(){
    this.authservice.logout()
  }
}
