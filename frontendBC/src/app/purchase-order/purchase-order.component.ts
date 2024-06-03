import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { GeneratedPurchaseOrder, OrderForClient, OrderForCreation, OrderForCreationArticle } from './purchase-order.model';
import { BonDeCommandeComponent } from '../bon-de-commande/bon-de-commande.component';
import { Article } from '../articles/articles.model';
import { Fournisseur } from '../Fournisseur/Fournisseur.model';
import { ArticleListStringPipePipe } from '../article-list-string-pipe.pipe';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BonDeCommandeComponent, ArticleListStringPipePipe],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: OrderForClient[] = [];
  newPurchaseOrderForm: FormGroup;
  showCreateModal: boolean = false;
  showUpdateModal: boolean = false;
  selectedOrder: GeneratedPurchaseOrder | undefined;
  articles: Article[] = [];
  fournisseurs: Fournisseur[] = [];
  selectedArticles: Set<string> = new Set();

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.newPurchaseOrderForm = this.fb.group({
      fournisseurId: ['', Validators.required],
      articles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.fetchPurchaseOrders();
    this.fetchArticles();
    this.fetchFournisseurs();
  }

  get articlesFormArray() {
    return this.newPurchaseOrderForm.get('articles') as FormArray;
  }

  addArticle(articleName: string = '', quantite: number = 1): void {
    const articleGroup = this.fb.group({
      nom: [articleName, Validators.required],
      quantite: [quantite, Validators.required]
    });
    this.articlesFormArray.push(articleGroup);
  }

  removeArticle(index: number): void {
    const articleName = this.articlesFormArray.at(index).get('nom')?.value;
    this.selectedArticles.delete(articleName);
    this.articlesFormArray.removeAt(index);
  }

  fetchPurchaseOrders(): void {
    this.dataService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = this.groupOrdersByOrderId(data);
      },
      error: (error) => console.error('Error fetching purchase orders:', error)
    });
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

  groupOrdersByOrderId(orders: OrderForClient[]): OrderForClient[] {
    const groupedOrders: { [key: number]: OrderForClient } = {};

    orders.forEach(order => {
      if (!groupedOrders[order.orderId]) {
        groupedOrders[order.orderId] = {
          orderId: order.orderId,
          fournisseurName: order.fournisseurName,
          articles: order.articles,
          date: order.date
        };
      }
    });

    return Object.values(groupedOrders);
  }

  submitPurchaseOrder(): void {
    if (this.newPurchaseOrderForm.valid) {
      const purchaseOrderData: OrderForCreation = {
        fournisseurName: this.newPurchaseOrderForm.get('fournisseurId')?.value,
        articles: this.newPurchaseOrderForm.get('articles')?.value
      };
      // Create new order
      this.dataService.createPurchaseOrder(purchaseOrderData).subscribe({
        next: () => {
          this.closeModal();
          this.fetchPurchaseOrders();
        },
        error: (error) => console.error('Error creating purchase order:', error)
      });
    }
  }

  toggleCreateModal(): void {
    this.showCreateModal = !this.showCreateModal;
    this.showUpdateModal = false;
    this.newPurchaseOrderForm.reset();
    this.articlesFormArray.clear();
    this.selectedArticles.clear();
  }

  toggleUpdateModal(): void {
    this.showUpdateModal = !this.showUpdateModal;
    this.showCreateModal = false;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.showUpdateModal = false;
    this.newPurchaseOrderForm.reset();
    this.articlesFormArray.clear();
    this.selectedArticles.clear();
  }

  generateBonDeCommande(order: OrderForClient): void {
    this.dataService.generatePurchaseOrder(order.orderId).subscribe(
      (generatedOrder) => this.selectedOrder = generatedOrder,
      (error) => console.error('Error generating Bon de Commande:', error)
    );
  }

  closeBonDeCommande(): void {
    this.selectedOrder = undefined;
  }

  toggleArticleSelection(articleName: string): void {
    if (this.selectedArticles.has(articleName)) {
      this.selectedArticles.delete(articleName);
      const index = this.articlesFormArray.controls.findIndex(control => control.get('nom')?.value === articleName);
      if (index !== -1) {
        this.removeArticle(index);
      }
    } else {
      this.selectedArticles.add(articleName);
      this.addArticle(articleName);
    }
  }

  isSelected(articleName: string): boolean {
    return this.selectedArticles.has(articleName);
  }

  deleteOrder(orderId: number): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.dataService.deletePurchaseOrder(orderId).subscribe({
        next: () => this.fetchPurchaseOrders(),
        error: (error) => console.error('Error deleting order:', error)
      });
    }
  }
}
