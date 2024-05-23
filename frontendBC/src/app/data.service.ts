import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fournisseur } from './Fournisseur/Fournisseur.model';
import { FamilleArticle } from './famille/famille.model';
import { Article } from './articles/articles.model';
import { BonDeCommande, GeneratedPurchaseOrder, OrderForClient, OrderForCreation } from './purchase-order/purchase-order.model';
import { PurchaseOrder } from './purchase-order/purchase-order.model';
import { Detail } from './purchase-order/purchase-order.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://localhost:7130/api';
  private fournisseurUrl = `${this.baseUrl}/Fournisseur`;
  private familleUrl = `${this.baseUrl}/FamilleArticle`;
  private articleUrl = `${this.baseUrl}/Article`;
  private purchaseOrderUrl = `${this.baseUrl}/PurchaseOrder`;
  private authUrl = `${this.baseUrl}/auth`;


  constructor(private http: HttpClient) { }
  private getAuthHeaders(): HttpHeaders {
    const username = 'your-username';
    const password = 'your-password';
    const auth = btoa(`${username}:${password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`
    });
  }

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
    return this.http.get<BonDeCommande[]>(this.purchaseOrderUrl);
  }

  getPurchaseOrders(): Observable<OrderForClient[]> {
    return this.http.get<OrderForClient[]>(this.purchaseOrderUrl);
  }
  getPurchaseOrderById(id: number): Observable<OrderForClient> {
    return this.http.get<OrderForClient>(`${this.purchaseOrderUrl}/${id}`);
  }

  createPurchaseOrder(order: OrderForCreation): Observable<OrderForCreation> {
    return this.http.post<OrderForCreation>(this.purchaseOrderUrl, order);
  }

  generatePurchaseOrder(supplierName: string): Observable<GeneratedPurchaseOrder>{
    let generatedPurchaseOrderUrl = `${this.baseUrl}/PurchaseOrder/generate/${supplierName}`;
    return this.http.get<GeneratedPurchaseOrder>(generatedPurchaseOrderUrl);
  }
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials, { headers: this.getAuthHeaders() });
  }

  signup(data: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.authUrl}/signup`, data, { headers: this.getAuthHeaders() });
  }
  getArticlesByFamille(familleId: number): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.articleUrl}/byFamille/${familleId}`);
  }
  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload/upload`, formData);
  }
  isArticleInPurchaseOrder(articleId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.purchaseOrderUrl}/isArticleInOrder/${articleId}`);
  }
}
