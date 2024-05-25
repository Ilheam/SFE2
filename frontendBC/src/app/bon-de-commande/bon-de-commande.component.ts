import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratedPurchaseOrder } from '../purchase-order/purchase-order.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-bon-de-commande',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bon-de-commande.component.html',
  styleUrls: ['./bon-de-commande.component.css']
})
export class BonDeCommandeComponent {
  @Input() order: GeneratedPurchaseOrder | undefined;

  downloadPDF() {
    const element = document.getElementById('bon-de-commande') as HTMLElement;
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('BonDeCommande.pdf');
    });
  }
}
