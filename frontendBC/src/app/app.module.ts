import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// Import FormsModule or ReactiveFormsModule here if you need them
// import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SuppliersComponent } from './suppliers/suppliers.component'; // Import your SuppliersComponent

@NgModule({
  declarations: [
    AppComponent,
    SuppliersComponent // Declare your SuppliersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add HttpClientModule to your imports
    // FormsModule // Uncomment if you've imported FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
