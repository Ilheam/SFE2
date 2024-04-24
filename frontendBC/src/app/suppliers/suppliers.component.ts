import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Supplier } from './suppliers.model';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {
  suppliers: Supplier[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getSuppliers().subscribe(
      (data) => {
        this.suppliers = data;
      },
      (error) => {
        // Handle errors here, for example, logging them or displaying a message
        console.error('Error fetching suppliers', error);
      }
    );
  }
}
