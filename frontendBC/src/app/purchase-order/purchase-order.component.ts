import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataService } from '../data.service';
import { PurchaseOrder, Entete, Detail } from './purchase-order.model';  // Ensure paths are correct

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule],

  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  newPurchaseOrder: PurchaseOrder = new PurchaseOrder();
  fournisseurs: any[] = [];
  articles: any[] = [];
  showModal: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchPurchaseOrders();
    this.fetchFournisseurs();
    this.fetchArticles();
  }

  fetchPurchaseOrders(): void {
    this.dataService.getPurchaseOrders().subscribe({
      next: (data: PurchaseOrder[]) => {
        this.purchaseOrders = data;
      },
      error: (error) => {
        console.error('Error fetching purchase orders:', error);
      }
    });
  }

  fetchFournisseurs(): void {
    this.dataService.getFournisseurs().subscribe({
      next: (data) => {
        this.fournisseurs = data;
      },
      error: (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    });
  }

  fetchArticles(): void {
    this.dataService.getArticles().subscribe({
      next: (data) => {
        this.articles = data;
      },
      error: (error) => {
        console.error('Error fetching articles:', error);
      }
    });
  }

  getFournisseurName(idFournisseur: number): string {
    const fournisseur = this.fournisseurs.find(f => f.fournisseurId === idFournisseur);
    return fournisseur ? fournisseur.nom : 'Unknown';
  }

  getArticleName(idArticle: number): string {
    const article = this.articles.find(a => a.articleId === idArticle);
    return article ? article.nomArticle : 'Unknown';
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
  }

  submitPurchaseOrder(): void {
    this.dataService.createPurchaseOrder(this.newPurchaseOrder).subscribe({
      next: () => {
        this.fetchPurchaseOrders();
        this.closeModal();
      },
      error: (error) => {
        console.error('Error creating purchase order:', error);
      }
    });
  }
}
