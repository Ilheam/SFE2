import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private dataService: DataService) {}

  login(): void {
    this.dataService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful');
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
