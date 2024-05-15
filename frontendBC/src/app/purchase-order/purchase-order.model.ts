export class PurchaseOrder {
    id: number = 0;
    entete: Entete = new Entete();
    details: Detail[] = [];
}

export class Entete {
    id: number = 0;
    idFournisseur: number = 0;
    numeroBonCommande: string = '';
    date: Date = new Date();
    devis: number = 0;
}

export class Detail {
    id: number = 0;
    idArticle: number = 0;
    quantite: number = 0;
    prixUnitaire: number = 0;
    montant: number = 0;
}

export class BonDeCommande {
    entete: Entete = new Entete();
    details: Detail[] = [];
}
