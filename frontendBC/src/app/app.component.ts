import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { DataService } from './data.service';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Angular Application';
  fournisseurs: any[] = [];

  constructor(private dataService: DataService) {} // Single constructor with DataService

  ngOnInit(): void {
    this.fetchFournisseurs();
  }

  fetchFournisseurs(): void {
    // Fetch data from the backend using DataService
    this.dataService.getFournisseurs().subscribe({
      next: (data) => {
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
}
