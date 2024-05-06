import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SuppliersModule } from './Fournisseur/Fournisseur.module'; 
import { FamilleModule } from './famille/famille.module'; 

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SuppliersModule,
    FamilleModule 
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
