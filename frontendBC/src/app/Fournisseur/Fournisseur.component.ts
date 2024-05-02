import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Fournisseur } from './Fournisseur.model';  // Make sure this path is correct

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './Fournisseur.component.html',
  styleUrls: ['./Fournisseur.component.css']
})
export class FournisseursComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadFournisseurs();
  }

  loadFournisseurs(): void {
    this.dataService.getFournisseurs().subscribe({
      next: (data) => this.fournisseurs = data,
      error: (error) => console.error('Failed to fetch fournisseurs', error)
    });
  }

  deleteFournisseur(id: number): void {
    this.dataService.DeleteFournisseur(id).subscribe({
      next: () => {
        console.log('Fournisseur deleted successfully');
        this.loadFournisseurs(); // Reload the list after deletion
      },
      error: (error) => console.error('Error deleting fournisseur', error)
    });
  }

}
