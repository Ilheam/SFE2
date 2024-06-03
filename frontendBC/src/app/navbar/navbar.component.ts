import { Component, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent implements OnChanges, OnInit {
  @Input() newComment: boolean = false;
  newCommentNotification: boolean = false;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(public authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    this.authService.authSubject.subscribe({
      next: user => {
        this.isAuthenticated = user ? true : false;
        this.isAdmin = user?.role == "ADMIN"; // if user is admin basically
      }
    })
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newComment'] && changes['newComment'].currentValue) {
      this.newCommentNotification = true;
    }
  }

  clearNotification(): void {
    this.newCommentNotification = false;
  }
}
