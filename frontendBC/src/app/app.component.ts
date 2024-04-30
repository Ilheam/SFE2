import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Import CommonModule
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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchFournisseurs();
  }

  fetchFournisseurs(): void {
    // Fetch data from the backend using the HttpClient
    this.http.get<any[]>('https://localhost:7234/api/Fournisseurs').subscribe({
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
    // Logic to handle delete
    console.log('Deleting fournisseur with ID:', id);
    // Here you might want to call a service to delete the data and then remove it from `fournisseurs` array or refresh the list
  }
}
