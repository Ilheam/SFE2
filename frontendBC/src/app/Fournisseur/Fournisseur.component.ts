import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { DataService } from '../data.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule here

import { Fournisseur } from './Fournisseur.model';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './Fournisseur.component.html',
  styleUrls: ['./Fournisseur.component.css']
})
export class SuppliersComponent implements OnInit {
  title = 'My Angular Application';
  fournisseurs: Fournisseur[] = [];
  newFournisseur: Fournisseur = new Fournisseur(); // Assuming default values or constructors are manageable
  selectedFournisseur: Fournisseur = new Fournisseur();
  showModal: boolean = false;
  showAddModal: boolean = false;
  
  constructor(private dataService: DataService) {} // Single constructor with DataService

  ngOnInit(): void {
    console.time('fetchFournisseurs')
    this.fetchFournisseurs();
  }

  fetchFournisseurs(): void {
    // Fetch data from the backend using DataService
    this.dataService.getFournisseurs().subscribe({
      next: (data) => {
        console.timeEnd('fetchFournisseurs')
        this.fournisseurs = data;
      },
      error: (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    });
  }

  DeleteFournisseur(id: number): void {
    // Use DataService to delete a fournisseur
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
    // Get the current fournisseur data from the list
    const existingFournisseur = this.fournisseurs.find(f => f.fournisseurId === fournisseurData.fournisseurId);
    // Merge existing data with the updated data
    const updatedFournisseur = { ...existingFournisseur, ...fournisseurData };
  
    this.dataService.updateFournisseur(updatedFournisseur.fournisseurId, updatedFournisseur).subscribe({
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
  submitAddFournisseur(fournisseurData: any): void {
    this.dataService.addFournisseur(fournisseurData).subscribe({
      next: (result) => {
        console.log('Fournisseur added successfully');
        this.closeAddModal();
        this.fetchFournisseurs(); // Fetches the latest list
      },
      error: (error) => {
        console.error('Error adding fournisseur:', error);
        this.closeAddModal();
      }
    });
  }
}