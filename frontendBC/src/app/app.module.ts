import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SuppliersComponent } from './Fournisseur/Fournisseur.component';
import { FamilleComponent } from './famille/famille.component';
import { ArticlesComponent } from './articles/articles.component';
import { FooterComponent } from './footer/footer.component';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module'; // Import the new module

@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PurchaseOrderModule // Add the new module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
