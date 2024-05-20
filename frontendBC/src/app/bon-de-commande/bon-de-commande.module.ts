import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BonDeCommandeComponent } from './bon-de-commande.component';

@NgModule({
  declarations: [
    BonDeCommandeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BonDeCommandeComponent
  ]
})
export class BonDeCommandeModule { } 