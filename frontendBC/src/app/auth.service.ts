import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7130/api/auth';
  private authSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.authSubject.asObservable();
  private currentUserId: number | null = null; // Store the user ID

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ id: number; email: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.authSubject.next(true);
        this.currentUserId = response.id; // Store the user ID on login
      })
    );
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  logout(): void {
    this.authSubject.next(false);
    this.currentUserId = null; // Clear the user ID on logout
  }

  isAuthenticated(): boolean {
    return this.authSubject.getValue();
  }

  getCurrentUserId(): number | null {
    return this.currentUserId; // Method to get the current user ID
  }
}
