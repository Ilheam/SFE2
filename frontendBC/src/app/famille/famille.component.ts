import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private dataService: DataService, private router: Router) {}

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
    const confirmed = confirm('Voulez-vous vraiment supprimer cette famille?');
    if (confirmed) {
      this.dataService.deleteFamille(id).subscribe({
        next: () => {
          this.fetchFamilles();
          console.log('Famille deleted successfully');
        },
        error: (error) => console.error('Error deleting famille:', error)
      });
    }
  }

  selectFamille(famille: FamilleArticle): void {
    this.selectedFamille = { ...famille };
    this.showModal = true;
  }

  navigateToArticles(familleId: number): void {
    this.router.navigate(['/articles', familleId]);
  }
  


  submitUpdate(): void {
    const updatedFamilleData = {
      nom: this.selectedFamille.nom
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
    const newFamilleData = {
      nom: this.newFamille.nom
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
