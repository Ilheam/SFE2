export class PurchaseOrder {
  id: number = 0;
  enteteId: number = 0;
  entete: Entete = new Entete();
  detailId: number = 0;
  detailsBc: Detail = new Detail();
  fournisseurNom: string = ''; // Added property
  articleNom: string = ''; // Added property
}

export class Entete {
  id: number = 0;
  articleId: number = 0;
  fournisseurId: number = 0;
  numeroBonCommande: string = '';
  date: Date = new Date();
  devis: number = 0;
  fournisseur: Fournisseur = new Fournisseur(); // Add this property
}

export class Detail {
  id: number = 0;
  validation1: string = '';
  validation2: number = 0;
  articleId: number = 0;
  quantite: number = 0;
  prixUnitaire: number = 0;
  bonDeCommandeId: number = 0;
  article: Article = new Article(); // Add this property
}

export class OrderForCreation {
  fournisseurName: string = '';
  articleNom: string = '';
  quantite: number = 0;
}

export class OrderForClient {
  fournisseurName: string = '';
  articleNom: string = '';
  quantite: number = 0;
  date: Date = new Date();
}

export class BonDeCommande {
  id: number = 0;
  enteteId: number = 0;
  entete: Entete = new Entete();
  detailId: number = 0;
  detailsBc: Detail = new Detail();
  fournisseurNom: string = ''; // Added property
  articleNom: string = ''; // Added property
}

export class Fournisseur {
  id: number = 0;
  nom: string = '';
}

export class Article {
  articleId: number = 0;
  nomArticle: string = '';
}
