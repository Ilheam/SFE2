import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur/Fournisseur.model';
import { FamilleArticle } from './famille/famille.model'; // Verify the correct path

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7234/api';
  private fournisseurUrl = `${this.baseUrl}/Fournisseurs`;
  private familleUrl = `${this.baseUrl}/FArticlesController2`;

  constructor(private http: HttpClient) { }

  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.fournisseurUrl);
  }

  DeleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.fournisseurUrl}/${id}`);
  }

  updateFournisseur(id: number, fournisseurData: any): Observable<any> {
    return this.http.put(`${this.fournisseurUrl}/${id}`, fournisseurData);
  }

  addFournisseur(fournisseur: any): Observable<any> {
    return this.http.post(this.fournisseurUrl, fournisseur);
  }

  getFamilles(): Observable<FamilleArticle[]> {
    return this.http.get<FamilleArticle[]>(this.familleUrl);
  }

  getFamilleById(id: number): Observable<FamilleArticle> {
    return this.http.get<FamilleArticle>(`${this.familleUrl}/${id}`);
  }

  addFamille(famille: FamilleArticle): Observable<FamilleArticle> {
    return this.http.post<FamilleArticle>(`${this.familleUrl}/`, famille);
  }

  updateFamille(id: number, famille: FamilleArticle): Observable<any> {
    return this.http.put(`${this.familleUrl}/${id}`, famille);
  }

  deleteFamille(id: number): Observable<any> {
    return this.http.delete(`${this.familleUrl}/${id}`);
  }
}
