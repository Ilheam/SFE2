import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { FamilleArticle } from './famille.model';
import { formatDate } from '@angular/common';

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
  selectedFile: File | null = null;

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

  handleFileInput(event: any): void {
    const files = event.target.files;
    if (files.length > 0) {
        this.selectedFile = files[0];
    }
  }

  submitUpdate(): void {
    const formData = new FormData();
    // Add form data
    this.dataService.updateFamille(this.selectedFamille.familleArticleId, formData).subscribe({
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
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  submitAddFamille(familleFormValue: any): void {
    let formData = new FormData();
    // Add form data
    this.dataService.addFamille(formData).subscribe({
      next: (result) => {
        console.log('Famille added successfully');
        this.closeAddModal();
        this.fetchFamilles();
      },
      error: (error) => {
        console.error('Error adding famille:', error);
        this.closeAddModal();
      }
    });
  }
}
