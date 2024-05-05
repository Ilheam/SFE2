import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Import FormsModule here
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SuppliersModule } from './Fournisseur/Fournisseur.module'; // Adjust path as needed

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SuppliersModule 
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
