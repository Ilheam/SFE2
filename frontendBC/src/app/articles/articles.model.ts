export class Article {
  id!: number;
  nomArticle: string = '';
  description: string = '';
  prix!: number;
  imageArticle: string = '';
  created!: Date;
  familleArticleId!: number;
  familleNom?: string; 
  quantite: number = 0;

}

export class ArticleForCreation {
  nomArticle: string = '';
  description: string = '';
  prix!: number;
  imageArticle: string = '';
  familleArticleId!: number; 
  quantite: number = 0;  // Add this line
}
