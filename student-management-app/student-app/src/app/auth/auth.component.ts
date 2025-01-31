import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  mode: string = 'signup';
  studentId: string | null = null;

  ngOnInit() {
    this.studentId = this.route.snapshot.paramMap.get('id');
    this.route.data.subscribe((data) => {
      this.mode = data['mode'] || 'signup';
    });
  }
}
