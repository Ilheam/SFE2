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
  newFamille = new FamilleArticle();  // Initialize with defaults or an empty constructor
  selectedFamille = new FamilleArticle();  // Initialize for selection
  showModal = false;
  showAddModal = false;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchFamilles();
  }
  formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return formatDate(date, 'yyyy-MM-dd', 'en-US');  // Adjust the locale as needed
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
    this.selectedFamille = famille;
    this.showModal = true;
  }

  submitUpdate(famille: FamilleArticle): void {
    console.log('Updating famille:', famille);
    if (!famille || famille.familleArticleId === undefined) {
      console.error('Invalid famille data:', famille);
      return;
    }
  
    this.dataService.updateFamille(famille.familleArticleId, famille).subscribe({
      next: () => {
        console.log('Famille updated successfully');
        this.showModal = false;
        this.fetchFamilles();
      },
      error: (error) => {
        console.error('Error updating famille:', error);
        this.showModal = false; // Ensure modal is closed even on error
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

  submitAddFamille(famille: FamilleArticle): void {
    this.dataService.addFamille(famille).subscribe({
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
