import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratedPurchaseOrder, GeneratedPurchaseOrderArticle } from '../purchase-order/purchase-order.model';

@Component({
  selector: 'app-bon-de-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bon-de-commande.component.html',
  styleUrls: ['./bon-de-commande.component.css']
})
export class BonDeCommandeComponent {
  @Input() order: GeneratedPurchaseOrder | undefined;
}
