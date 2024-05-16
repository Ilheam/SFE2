export class PurchaseOrder {
    id: number = 0;
    enteteId: number = 0;
    entete: Entete = new Entete();
    detailId: number = 0;
    detail: Detail = new Detail();
  }
  
  export class Entete {
    id: number = 0;
    idArticle: number = 0;
    idFournisseur: number = 0;
    numeroBonCommande: string = '';
    date: Date = new Date();
    devis: number = 0;
  }
  
  export class Detail {
    id: number = 0;
    validation1: string = '';
    validation2: number = 0;
    idArticle: number = 0;
    quantite: number = 0;
    prixUnitaire: number = 0;
    bonDeCommandeId: number = 0;
  }
  export class BonDeCommande {
    id: number = 0;
    enteteId: number = 0;
    entete: Entete = new Entete();
    detailId: number = 0;
    detail: Detail = new Detail();
  }
  