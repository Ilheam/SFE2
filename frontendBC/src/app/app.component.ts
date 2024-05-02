import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule here

import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Angular Application';
  fournisseurs: any[] = [];
  selectedFournisseur: any={};
  showModal: boolean = false;
  
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
        // Assign the data received to the fournisseurs array
        this.fournisseurs = data;
      },
      error: (error) => {
        // Log errors to the console if the request fails
        console.error('Error fetching fournisseurs:', error);
      }
    });
  }

  DeleteFournisseur(id: number): void {
    // Use DataService to delete a fournisseur
    this.dataService.DeleteFournisseur(id).subscribe({
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
}
