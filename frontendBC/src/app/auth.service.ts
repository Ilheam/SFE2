import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserSubjectModel } from './auth.service.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7130/api/auth';
  authSubject = new BehaviorSubject<UserSubjectModel | null>(null);
  //isLoggedIn = this.authSubject.asObservable();
  //private currentUserId: number | null = null; // Store the user ID

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<UserSubjectModel>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.authSubject.next(response);
        sessionStorage.setItem("user", JSON.stringify(response));
        //this.currentUserId = response.id; // Store the user ID on login
      })
    );
  }

  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, data);
  }

  logout(): void {
    sessionStorage.removeItem("user");
    this.authSubject.next(null);
    //this.currentUserId = null; // Clear the user ID on logout
  }

  tryAutoLogin(){
    try{
      let sub = JSON.parse(sessionStorage.getItem("user") ?? '') as UserSubjectModel;
      this.authSubject.next(sub);
    }catch(er: any){
      sessionStorage.removeItem('user');
      this.authSubject.next(null);
      console.log(er);
    }
  }

  // isAuthenticated(): boolean {
  //   return this.authSubject.getValue();
  // }

  // getCurrentUserId(): number | null {
  //   return this.currentUserId; // Method to get the current user ID
  // }
}
