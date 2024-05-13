export class Fournisseur {
  fournisseurId!: number;
  nom: string = ''; // default to an empty string if not provided
  email: string = '';
  telephone: string = '';
  adresse: string = ''; // Ensure this is always initialized
  designation: string = '';
}