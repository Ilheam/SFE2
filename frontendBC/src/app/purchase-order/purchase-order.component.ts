import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Article } from '../articles/articles.model';
import { Fournisseur } from '../Fournisseur/Fournisseur.model';
import { PurchaseOrder, Entete, Detail, BonDeCommande } from './purchase-order.model';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  articles: Article[] = [];
  fournisseurs: Fournisseur[] = [];
  newPurchaseOrder: BonDeCommande = new BonDeCommande();
  showModal: boolean = false;
  purchaseOrders: BonDeCommande[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchArticles();
    this.fetchFournisseurs();
    this.fetchPurchaseOrders();
    this.initializeNewPurchaseOrder();
  }

  fetchArticles(): void {
    this.dataService.getArticles().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('Error fetching articles:', error)
    });
  }

  fetchFournisseurs(): void {
    this.dataService.getFournisseurs().subscribe({
      next: (data) => this.fournisseurs = data,
      error: (error) => console.error('Error fetching fournisseurs:', error)
    });
  }

  fetchPurchaseOrders(): void {
    this.dataService.getPurchaseOrders().subscribe({
      next: (data) => this.purchaseOrders = data,
      error: (error) => console.error('Error fetching purchase orders:', error)
    });
  }

  initializeNewPurchaseOrder(): void {
    this.newPurchaseOrder = {
      entete: new Entete(),
      details: [new Detail()]
    };
  }

  submitPurchaseOrder(): void {
    this.dataService.createPurchaseOrder(this.newPurchaseOrder).subscribe({
      next: (result) => {
        console.log('Purchase order created successfully');
        this.closeModal();
        this.resetForm();
        this.fetchPurchaseOrders();
      },
      error: (error) => {
        console.error('Error creating purchase order:', error);
        this.closeModal();
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
  }

  resetForm(): void {
    this.initializeNewPurchaseOrder();
  }

  getFournisseurName(id: number): string {
    const fournisseur = this.fournisseurs.find(f => f.fournisseurId === id);
    return fournisseur ? fournisseur.nom : 'Unknown';
  }

  getArticleName(id: number): string {
    const article = this.articles.find(a => a.articleId === id);
    return article ? article.nomArticle : 'Unknown';
  }
}
