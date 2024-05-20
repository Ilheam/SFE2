import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';  // Adjust path as needed
import { FamilleComponent } from './famille/famille.component'; // Adjust path based on your folder structure
import { ArticlesComponent } from './articles/articles.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule, SuppliersComponent, FamilleComponent, ArticlesComponent, PurchaseOrderComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Angular Application';
  fournisseurs: any[] = [];
  selectedFournisseur: any = {};
  newFournisseur: any = {};
  showModal: boolean = false;
  showAddModal: boolean = false;
  showSuppliers = false;
  showArticles = false;
  showFamilles = false;
  showPurchaseOrders = false;

  constructor(private dataService: DataService) {} // Single constructor with DataService

  ngOnInit(): void {
    this.fetchFournisseurs();
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

  deleteFournisseur(id: number): void {
    this.dataService.deleteFournisseur(id).subscribe({
      next: () => this.fetchFournisseurs(), // Refresh the list after deletion
      error: (error) => console.error('Error deleting fournisseur:', error)
    });
  }

  selectFournisseur(fournisseur: any): void {
    this.selectedFournisseur = fournisseur;
    this.showModal = true;  // Set to true to show modal
  }

  submitUpdate(fournisseurData: any): void {
    this.dataService.updateFournisseur(fournisseurData.fournisseurId, fournisseurData).subscribe({
      next: () => {
        console.log('Fournisseur updated successfully');
        this.showModal = false;  // Set to false to hide modal
        this.fetchFournisseurs();
      },
      error: (error) => {
        console.error('Error updating fournisseur:', error);
        this.showModal = false;  // Also ensure modal is closed on error
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal; // Toggle the visibility
  }

  closeModal(): void {
    this.showModal = false;
  } 

  toggleAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  toggleSuppliers(): void {
    this.showSuppliers = true;
    this.showArticles = false;
    this.showFamilles = false;
    this.showPurchaseOrders = false;
  }

  toggleArticles(): void {
    this.showSuppliers = false;
    this.showArticles = true;
    this.showFamilles = false;
    this.showPurchaseOrders = false;
  }

  toggleFamilles(): void {
    this.showSuppliers = false;
    this.showArticles = false;
    this.showFamilles = true;
    this.showPurchaseOrders = false;
  }

  togglePurchaseOrders(): void {
    this.showSuppliers = false;
    this.showArticles = false;
    this.showFamilles = false;
    this.showPurchaseOrders = true;
  }

  submitAddFournisseur(fournisseurData: any): void {
    this.dataService.addFournisseur(fournisseurData).subscribe({
      next: (result) => {
        console.log('Fournisseur added successfully');
        this.closeAddModal();
        this.fetchFournisseurs(); // Assuming you have a method to refresh the list
      },
      error: (error) => {
        console.error('Error adding fournisseur:', error);
        this.closeAddModal();
      }
    });
  }
}
