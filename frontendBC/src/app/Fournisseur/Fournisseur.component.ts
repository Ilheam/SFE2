import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Fournisseur } from './Fournisseur.model';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.css']
})
export class SuppliersComponent implements OnInit {
  title = 'My Angular Application';
  fournisseurs: Fournisseur[] = [];
  newFournisseur: Fournisseur = new Fournisseur();
  selectedFournisseur: Fournisseur = new Fournisseur();
  showModal: boolean = false;
  showAddModal: boolean = false;
  supplierPurchaseCounts: { [key: number]: number } = {};

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchFournisseurs();
    this.fetchSupplierPurchaseCounts();
  }

  fetchFournisseurs(): void {
    this.dataService.getFournisseurs().subscribe({
      next: (data) => this.fournisseurs = data,
      error: (error) => console.error('Error fetching fournisseurs:', error)
    });
  }

  fetchSupplierPurchaseCounts(): void {
    this.dataService.getSupplierPurchaseCounts().subscribe({
      next: (data) => this.supplierPurchaseCounts = data,
      error: (error) => console.error('Error fetching supplier purchase counts:', error)
    });
  }

  deleteFournisseur(id: number): void {
    const confirmed = confirm('Voulez-vous vraiment supprimer ce fournisseur ?');
    if (confirmed) {
      this.dataService.deleteFournisseur(id).subscribe({
        next: () => this.fetchFournisseurs(),
        error: (error) => console.error('Error deleting fournisseur:', error)
      });
    }
  }

  selectFournisseur(fournisseur: Fournisseur): void {
    this.selectedFournisseur = { ...fournisseur };
    this.showModal = true;
  }

  submitUpdate(): void {
    if (this.selectedFournisseur.id === undefined || this.selectedFournisseur.id === null) {
      console.error('Error updating fournisseur: ID is undefined or null');
      return;
    }

    this.dataService.updateFournisseur(this.selectedFournisseur.id, this.selectedFournisseur).subscribe({
      next: () => {
        console.log('Fournisseur updated successfully');
        this.showModal = false;
        this.fetchFournisseurs();
      },
      error: (error) => {
        console.error('Error updating fournisseur:', error);
        this.showModal = false;
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
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

  submitAddFournisseur(): void {
    this.dataService.addFournisseur(this.newFournisseur).subscribe({
      next: (result) => {
        console.log('Fournisseur added successfully');
        this.closeAddModal();
        this.fetchFournisseurs();
      },
      error: (error) => {
        console.error('Error adding fournisseur:', error);
        this.closeAddModal();
      }
    });
  }

  isTopSupplier(fournisseur: Fournisseur): boolean {
    return this.supplierPurchaseCounts[fournisseur.id] >= 2;
  }
}
