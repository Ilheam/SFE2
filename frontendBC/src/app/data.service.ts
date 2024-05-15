import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur/Fournisseur.model';  
import { FamilleArticle } from './famille/famille.model';  
import { Article } from './articles/articles.model';  
import { BonDeCommande } from './purchase-order/purchase-order.model';  

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7234/api';
  private fournisseurUrl = `${this.baseUrl}/Fournisseurs`;
  private familleUrl = `${this.baseUrl}/FArticlesController2`;
  private articleUrl = `${this.baseUrl}/Articles`;
  private purchaseOrderUrl = `${this.baseUrl}/PurchaseOrder`;

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

  addFamille(famille: any): Observable<any> {
    return this.http.post(this.familleUrl, famille, {
      observe: 'response'
    });
  }

  updateFamille(id: number, familleData: any): Observable<any> {
    return this.http.put(`${this.familleUrl}/${id}`, familleData, {
      observe: 'response'
    });
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

  addArticle(articleData: any): Observable<any> {
    return this.http.post(this.articleUrl, articleData);
  }

  updateArticle(id: number, articleData: any): Observable<any> {
    return this.http.put(`${this.articleUrl}/${id}`, articleData);
  }

  deleteArticle(id: number): Observable<any> {
    return this.http.delete(`${this.articleUrl}/${id}`);
  }

  // Methods related to Purchase Orders
  getBonDeCommandes(): Observable<BonDeCommande[]> {
    return this.http.get<BonDeCommande[]>(`${this.purchaseOrderUrl}/GetAll`);
  }

  createPurchaseOrder(order: BonDeCommande): Observable<any> {
    return this.http.post(`${this.baseUrl}/PurchaseOrder/Create`, order);
  }

  getPurchaseOrders(): Observable<BonDeCommande[]> {
    return this.http.get<BonDeCommande[]>(`${this.baseUrl}/PurchaseOrder/GetAll`);
  }
  
}
