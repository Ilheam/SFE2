import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuppliersComponent } from './Fournisseur.component';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [CommonModule, FormsModule],
  exports: [SuppliersComponent] 
})
export class SuppliersModule { }
