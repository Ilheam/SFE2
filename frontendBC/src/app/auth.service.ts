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

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap(() => {
        this.authSubject.next(true);
      })
    );
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  logout(): void {
    this.authSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.authSubject.getValue();
  }
}
