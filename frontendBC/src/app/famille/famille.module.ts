import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FamilleComponent } from './famille.component'; 
@NgModule({
  declarations: [
    FamilleComponent  
  ],
  imports: [
    CommonModule,  
    FormsModule   
  ],
  exports: [
    FamilleComponent 
  ]
})
export class FamilleModule { }
