import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { GeneratedPurchaseOrder, OrderForClient, OrderForCreation, OrderForCreationArticle } from './purchase-order.model';
import { BonDeCommandeComponent } from '../bon-de-commande/bon-de-commande.component';
import { Article } from '../articles/articles.model';

interface GroupedOrder {
  fournisseurName: string;
  articles: OrderForCreationArticle[];
  date: Date;
}

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BonDeCommandeComponent],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: GroupedOrder[] = [];
  newPurchaseOrderForm: FormGroup;
  showModal: boolean = false;
  selectedOrder: GeneratedPurchaseOrder | undefined;
  articles: Article[] = [];
  selectedArticles: Set<string> = new Set();

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.newPurchaseOrderForm = this.fb.group({
      fournisseur: ['', Validators.required],
      articles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.fetchPurchaseOrders();
    this.fetchArticles();
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
        this.purchaseOrders = this.groupOrdersByFournisseur(data);
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

  groupOrdersByFournisseur(orders: OrderForClient[]): GroupedOrder[] {
    const grouped: { [key: string]: GroupedOrder } = {};

    orders.forEach(order => {
      if (!grouped[order.fournisseurName]) {
        grouped[order.fournisseurName] = {
          fournisseurName: order.fournisseurName,
          articles: [],
          date: order.date
        };
      }
      grouped[order.fournisseurName].articles.push({ nom: order.articleNom, quantite: order.quantite });
    });

    return Object.values(grouped);
  }

  submitPurchaseOrder(): void {
    if (this.newPurchaseOrderForm.valid) {
      const purchaseOrderData: OrderForCreation = {
        fournisseurName: this.newPurchaseOrderForm.get('fournisseur')?.value,
        articles: this.newPurchaseOrderForm.get('articles')?.value
      };

      this.dataService.createPurchaseOrder(purchaseOrderData).subscribe({
        next: () => {
          this.closeModal();
          this.fetchPurchaseOrders();
        },
        error: (error) => console.error('Error creating purchase order:', error)
      });
    }
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
    this.newPurchaseOrderForm.reset();
    this.articlesFormArray.clear();
    this.selectedArticles.clear();
  }

  generateBonDeCommande(order: GroupedOrder): void {
    this.dataService.generatePurchaseOrder(order.fournisseurName).subscribe(
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
}
