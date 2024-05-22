import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';
import { FamilleComponent } from './famille/famille.component';
import { ArticlesComponent } from './articles/articles.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    FormsModule,
    SuppliersComponent,
    FamilleComponent,
    ArticlesComponent,
    PurchaseOrderComponent,
    NavbarComponent,
    HomeComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Angular Application';
}
