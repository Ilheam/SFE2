export class Article {
  id!: number;
  nomArticle: string = '';
  description: string = '';
  prix!: number;
  imageArticle: string = '';
  created!: Date;
  familleArticleId!: number;
  familleNom?: string; // Added this property to hold the family name
}

export class ArticleForCreation {
  nomArticle: string = '';
  description: string = '';
  prix!: number;
  imageArticle: string = '';
  familleArticleId!: number; // Include this property
}
