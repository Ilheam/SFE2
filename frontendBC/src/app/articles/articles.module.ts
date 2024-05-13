import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticlesComponent } from './articles.component'; // Make sure the path and component name are correct

@NgModule({
  declarations: [ArticlesComponent], // Declare ArticlesComponent
  imports: [
    CommonModule, // Common functionalities for Angular directives
    FormsModule  // Support for template-driven forms
  ],
  exports: [ArticlesComponent]  // Export ArticlesComponent to be used in other parts of the app
})
export class ArticlesModule { }
