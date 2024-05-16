import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PurchaseOrderComponent } from './purchase-order.component';

@NgModule({
  declarations: [PurchaseOrderComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [PurchaseOrderComponent]
})
export class PurchaseOrderModule { }
