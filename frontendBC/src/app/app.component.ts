import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
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
// hbsi hna 
  fetchFournisseurs(): void {
    this.http.get<any[]>('https://localhost:7234/api/Fournisseurs').subscribe({
      next: (data) => {
        console.log('Fetched data:', data); // Log the fetched data for debugging
        this.fournisseurs = data;
      },
      error: (error) => {
        console.error('Error fetching fournisseurs:', error);
      }
    });
  }

  getRowsHtml(): string {
  return this.fournisseurs.map(f => `
    <tr>
      <td>${f.fournisseurId}</td>
      <td>${f.nom}</td>
    </tr>
  `).join('');
}

}

