import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order.component';
import { BonDeCommandeComponent } from '../bon-de-commande/bon-de-commande.component';

@NgModule({
  declarations: [
    PurchaseOrderComponent,
    BonDeCommandeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PurchaseOrderComponent
  ]
})
export class PurchaseOrderModule { }