import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur/Fournisseur.model';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private apiUrl = 'https://localhost:7234/api/Fournisseurs'; // Change to your actual API URL

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.apiUrl);
  }
  DeleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}