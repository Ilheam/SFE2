import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule],
  standalone: true,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private dataService: DataService) {}

  signup(): void {
    this.dataService.signup({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Signup successful');
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }
}
