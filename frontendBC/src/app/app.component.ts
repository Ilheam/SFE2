import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { DataService } from './data.service';
import { FormsModule } from '@angular/forms';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';
import { FamilleComponent } from './famille/famille.component';
import { ArticlesComponent } from './articles/articles.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule, SuppliersComponent, FamilleComponent, ArticlesComponent, PurchaseOrderComponent], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Angular Application';
  showSuppliers = false;
  showArticles = false;
  showFamilles = false;
  showPurchaseOrders = false;
  showAdditionalContent = false;

  constructor() {}

  ngOnInit(): void {}

  toggleSuppliers(): void {
    this.resetViews();
    this.showSuppliers = true;
  }

  toggleArticles(): void {
    this.resetViews();
    this.showArticles = true;
  }

  toggleFamilles(): void {
    this.resetViews();
    this.showFamilles = true;
  }

  togglePurchaseOrders(): void {
    this.resetViews();
    this.showPurchaseOrders = true;
  }

  showAccueil(): void {
    this.resetViews();
    this.showAdditionalContent = true;
  }

  private resetViews(): void {
    this.showSuppliers = false;
    this.showArticles = false;
    this.showFamilles = false;
    this.showPurchaseOrders = false;
    this.showAdditionalContent = false;
  }
}
