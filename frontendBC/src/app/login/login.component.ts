import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterLink],
  standalone: true,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.router.navigate(['/home']); // Redirect to home or any other route after successful login
      },
      error: (error) => {
        console.error('Login failed:', error);
      }
    });
  }
}
