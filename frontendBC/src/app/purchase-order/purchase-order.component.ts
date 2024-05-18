import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { BonDeCommande, OrderForClient, OrderForCreation } from './purchase-order.model';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: OrderForClient[] = [];
  newPurchaseOrder: OrderForCreation = new OrderForCreation();
  showModal: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.fetchPurchaseOrders();
  }

  fetchPurchaseOrders(): void {
    this.dataService.getPurchaseOrders().subscribe({
      next: (data) => {
        this.purchaseOrders = data;
        console.log(data);
      },
      error: (error) => console.error('Error fetching purchase orders:', error)
    });
  }

  submitPurchaseOrder(): void {
    console.log(this.newPurchaseOrder);
    this.dataService.createPurchaseOrder(this.newPurchaseOrder).subscribe({
      next: (data) => {
        this.closeModal();
      },
      error: (error) => console.error('Error creating purchase order:', error)
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
    this.newPurchaseOrder = new OrderForCreation(); // Reset form
  }

  //no need, server gives us what we need

  // getFournisseurName(id: number): string {
  //   const fournisseur = this.purchaseOrders.find(po => po.entete.fournisseurId === id)?.entete.fournisseur;
  //   return fournisseur ? fournisseur.nom : 'Unknown';
  // }

  // getArticleName(id: number): string {
  //   const article = this.purchaseOrders.find(po => po.detailsBc.articleId === id)?.detailsBc.article;
  //   return article ? article.nomArticle : 'Unknown';
  // }
}
