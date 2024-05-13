import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur/Fournisseur.model';  // Verify the correct path
import { FamilleArticle } from './famille/famille.model';  // Verify the correct path
import { Article } from './articles/articles.model';  // Verify the correct path

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7234/api';
  private fournisseurUrl = `${this.baseUrl}/Fournisseurs`;
  private familleUrl = `${this.baseUrl}/FArticlesController2`;
  private articleUrl = `${this.baseUrl}/Articles`;

  constructor(private http: HttpClient) { }

  // Methods related to Fournisseurs
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http.get<Fournisseur[]>(this.fournisseurUrl);
  }

  deleteFournisseur(id: number): Observable<any> {
    return this.http.delete(`${this.fournisseurUrl}/${id}`);
  }

  updateFournisseur(id: number, fournisseurData: any): Observable<any> {
    return this.http.put(`${this.fournisseurUrl}/${id}`, fournisseurData);
  }

  addFournisseur(fournisseur: any): Observable<any> {
    return this.http.post(this.fournisseurUrl, fournisseur);
  }

  // Methods related to Familles
  getFamilles(): Observable<FamilleArticle[]> {
    return this.http.get<FamilleArticle[]>(this.familleUrl);
  }

  getFamilleById(id: number): Observable<FamilleArticle> {
    return this.http.get<FamilleArticle>(`${this.familleUrl}/${id}`);
  }

  addFamille(famille: FormData): Observable<any> {
    return this.http.post(`${this.familleUrl}/Create`, famille);  // Verify if the '/Create' endpoint is required
  }

  updateFamille(id: number, familleData: FormData): Observable<any> {
    return this.http.put(`${this.familleUrl}/${id}`, familleData);
  }

  deleteFamille(id: number): Observable<any> {
    return this.http.delete(`${this.familleUrl}/${id}`);
  }

  // Methods related to Articles
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articleUrl);
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.articleUrl}/${id}`);
  }

  addArticle(articleData: FormData): Observable<any> {
    return this.http.post(this.articleUrl, articleData);
  }

  updateArticle(id: number, articleData: FormData): Observable<any> {
    return this.http.put(`${this.articleUrl}/${id}`, articleData);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.articleUrl}/${id}`);
  }
}
