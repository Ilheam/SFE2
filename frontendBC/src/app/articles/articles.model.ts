export class Article {
  id!: number;
  nomArticle: string = ''; // Default empty string if not provided
  description: string = '';
  prix!: number; // Using ! to denote that this field is expected to be provided
  imageArticle: string = ''; // Path or identifier for the image
  dateCreation!: Date; // Using Date type for date fields
}

export class ArticleForCreation {
  nomArticle: string = ''; // Default empty string if not provided
  description: string = '';
  prix!: number; // Using ! to denote that this field is expected to be provided
  imageArticle: string = ''; // Path or identifier for the image
}
