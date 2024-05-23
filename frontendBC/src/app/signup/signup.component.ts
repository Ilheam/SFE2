import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(private dataService: DataService, private router: Router) {}

  signup(): void {
    this.dataService.signup({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Signup successful');
        this.router.navigate(['/login']); // Redirect to login after successful signup
      },
      error: (error) => {
        console.error('Signup failed:', error);
      }
    });
  }
}
