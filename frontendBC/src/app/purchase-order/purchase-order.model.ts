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
  article: Article = new Article(); 
}

export class OrderForCreation {
  fournisseurName: string = '';
  articles: OrderForCreationArticle[] = [];
}

export class OrderForCreationArticle {
  nom: string = '';
  quantite: number = 0;
}

export class OrderForClient {
  orderId: number = 0; 
  fournisseurName: string = '';
  articles: OrderArticleForClient[] = [];
  date: Date = new Date();
}

export class OrderArticleForClient{
  id: number = 0;
  name: string = '';
  quantity: number = 0;
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

export class GeneratedPurchaseOrder {
  nom : string = '';
  email : string = '';
  phone : string = ''; 
  adress : string = ''; 
  articles: GeneratedPurchaseOrderArticle[] = [];
  total :number = 0;
  date: Date = new Date();
}

export class GeneratedPurchaseOrderArticle{
  nom: string = '';
  quantite: number = 0;
  prix: number = 0;
  total: number = 0;
}