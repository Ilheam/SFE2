import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { FamilleArticle } from './famille.model';

@Component({
  selector: 'app-famille',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './famille.component.html',
  styleUrls: ['./famille.component.css']
})
export class FamilleComponent implements OnInit {
  familles: FamilleArticle[] = [];
  newFamille = new FamilleArticle();  
  selectedFamille = new FamilleArticle();
  showModal = false;
  showAddModal = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchFamilles();
  }

  fetchFamilles(): void {
    this.dataService.getFamilles().subscribe({
      next: (data) => this.familles = data,
      error: (error) => console.error('Error fetching familles:', error)
    });
  }

  deleteFamille(id: number): void {
    console.log('Received ID for deletion:', id); // Debugging statement

    if (id === undefined || id === null) {
      console.error('Error deleting famille: ID is undefined or null');
      return;
    }

    this.dataService.deleteFamille(id).subscribe({
      next: () => {
        this.fetchFamilles();
        console.log('Famille deleted successfully');
      },
      error: (error) => console.error('Error deleting famille:', error)
    });
  }

  selectFamille(famille: FamilleArticle): void {
    this.selectedFamille = { ...famille };
    this.showModal = true;
  }

  submitUpdate(): void {
    const updatedFamilleData = {
      nom: this.selectedFamille.nom,
      description: this.selectedFamille.description,
      prix: this.selectedFamille.prix,
      image: this.selectedFamille.image,
      dateCreation: this.selectedFamille.dateCreation ? new Date(this.selectedFamille.dateCreation).toISOString() : '',
      categorie: this.selectedFamille.categorie
    };

    this.dataService.updateFamille(this.selectedFamille.id, updatedFamilleData).subscribe({
      next: () => {
        console.log('Famille updated successfully');
        this.showModal = false;
        this.fetchFamilles();
      },
      error: (error) => {
        console.error('Error updating famille:', error);
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
    this.showAddModal = !this.showAddModal;
  }
  
  closeAddModal(): void {
    this.showAddModal = false;
  }

  submitAddFamille(): void {
    const dateCreation = new Date(this.newFamille.dateCreation);
    const newFamilleData = {
      nom: this.newFamille.nom,
      description: this.newFamille.description,
      prix: this.newFamille.prix,
      image: this.newFamille.image, // Handle image as a simple text field
      dateCreation: dateCreation.toISOString(),
      categorie: this.newFamille.categorie
    };
  
    this.dataService.addFamille(newFamilleData).subscribe({
      next: (result) => {
        console.log('Famille added successfully');
        this.closeAddModal();
        this.fetchFamilles(); // Refresh the list to show the newly added famille
      },
      error: (error) => {
        console.error('Error adding famille:', error);
      }
    });
  }
}
