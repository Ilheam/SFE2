import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { GeneratedPurchaseOrder, OrderForClient, OrderForCreation, OrderForCreationArticle } from './purchase-order.model';
import { BonDeCommandeComponent } from '../bon-de-commande/bon-de-commande.component';
import { Article } from '../articles/articles.model'; // Use the existing Article type

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BonDeCommandeComponent],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: OrderForClient[] = [];
  newPurchaseOrderForm: FormGroup;
  showModal: boolean = false;
  selectedOrder: GeneratedPurchaseOrder | undefined;
  articles: Article[] = [];  // Use the imported Article type
  selectedArticles: Set<string> = new Set();  // Set to keep track of selected articles

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.newPurchaseOrderForm = this.fb.group({
      fournisseur: ['', Validators.required],
      articles: this.fb.array([])  // Initialize the articles as a form array
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
    this.selectedArticles.delete(articleName);  // Remove from selected articles set
    this.articlesFormArray.removeAt(index);
  }

  fetchPurchaseOrders(): void {
    this.dataService.getPurchaseOrders().subscribe({
      next: (data) => this.purchaseOrders = data,
      error: (error) => console.error('Error fetching purchase orders:', error)
    });
  }

  fetchArticles(): void {
    this.dataService.getArticles().subscribe({
      next: (data) => this.articles = data, // Ensure data matches the Article type
      error: (error) => console.error('Error fetching articles:', error)
    });
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

  generateBonDeCommande(order: OrderForClient): void {
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
