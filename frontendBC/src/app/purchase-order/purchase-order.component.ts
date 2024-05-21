import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { GeneratedPurchaseOrder, OrderForClient, OrderForCreation } from './purchase-order.model';
import { BonDeCommandeComponent } from '../bon-de-commande/bon-de-commande.component';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule, BonDeCommandeComponent],
  templateUrl: './purchase-order.component.html',
  styleUrls: ['./purchase-order.component.css']
})
export class PurchaseOrderComponent implements OnInit {
  purchaseOrders: OrderForClient[] = [];
  newPurchaseOrder: OrderForCreation = new OrderForCreation();
  showModal: boolean = false;
  selectedOrder: GeneratedPurchaseOrder | undefined;

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
    this.dataService.createPurchaseOrder(this.newPurchaseOrder).subscribe({
      next: () => {
        this.closeModal();
        this.fetchPurchaseOrders();
      },
      error: (error) => console.error('Error creating purchase order:', error)
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
    this.newPurchaseOrder = new OrderForCreation();
  }

  generateBonDeCommande(order: OrderForClient): void {
    this.dataService.generatePurchaseOrder(order.fournisseurName).subscribe(
      (generatedOrder) => {
        this.selectedOrder = generatedOrder;
      }, 
      (error) => {
        console.error('Error generating Bon de Commande:', error);
      }
    );
  }

  closeBonDeCommande(): void {
    this.selectedOrder = undefined;
  }
}
