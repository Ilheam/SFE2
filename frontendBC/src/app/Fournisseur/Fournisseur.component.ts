import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Fournisseur } from './Fournisseur.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './Fournisseur.component.html',
  styleUrls: ['./Fournisseurs.component.css']
})
export class SuppliersComponent implements OnInit {
  fournisseurs: Fournisseur[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getFournisseurs().subscribe(data => {
      this.fournisseurs = data;
    }, error => {
      console.error('Error fetching data: ', error);
    });
  }
}