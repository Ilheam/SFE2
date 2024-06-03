import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
import { AuthService } from './auth.service';


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
export class AppComponent implements OnInit{
  authService = inject(AuthService);
  platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)){
      this.authService.tryAutoLogin();
      console.log('tried loggin in auto');
    }
  }

  newComment: boolean = false;

  title = 'My Angular Application';
  onNewComment(): void {
    this.newComment = true;
  }
}
