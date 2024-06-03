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
  confirmPassword: string = '';
  passwordMismatch: boolean = false;
  asAdmin: boolean = false;

  constructor(private dataService: DataService, private router: Router) {}

  signup(): void {
    this.passwordMismatch = this.password !== this.confirmPassword;
    if (!this.passwordMismatch) {
      const signupData = { email: this.email, password: this.password, asAdmin: this.asAdmin };
      console.log('Signup Data:', signupData); // Log the signup data
      this.dataService.signup(signupData).subscribe({
        next: (response) => {
          console.log('Signup successful');
          this.router.navigate(['/login']); 
               },
        error: (error) => {
          console.error('Signup failed:', error);
        }
      });
    }
  }
}
