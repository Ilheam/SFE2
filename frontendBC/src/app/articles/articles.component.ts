import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Article, ArticleForCreation } from './articles.model';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  title = 'My Angular Application';
  articles: Article[] = [];
  newArticle: ArticleForCreation = new ArticleForCreation();
  selectedArticle: Article = new Article();
  showModal: boolean = false;
  showAddModal: boolean = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.dataService.getArticles().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('Error fetching articles:', error)
    });
  }

  deleteArticle(id: number): void {
    this.dataService.deleteArticle(id).subscribe({
      next: () => this.fetchArticles(),
      error: (error) => console.error('Error deleting article:', error)
    });
  }

  selectArticle(article: Article): void {
    this.selectedArticle = article;
    this.showModal = true;
  }

  submitUpdate(articleData: any): void {
    this.dataService.updateArticle(this.selectedArticle.id, articleData).subscribe({
      next: () => {
        console.log('Article updated successfully');
        this.showModal = false;
        this.fetchArticles();
      },
      error: (error) => {
        console.error('Error updating article:', error);
        this.showModal = false;
      }
    });
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  closeModal(): void {
    this.showModal = false;
  }

  toggleAddModal(): void {
    this.showAddModal = true;
  }

  closeAddModal(): void {
    this.showAddModal = false;
  }

  submitAddArticle(): void {
    const newArticleData = {
      nomArticle: this.newArticle.nomArticle,
      description: this.newArticle.description,
      prix: this.newArticle.prix,
      imageArticle: this.newArticle.imageArticle
    };

    this.dataService.addArticle(newArticleData).subscribe({
      next: (result) => {
        console.log('Article added successfully');
        this.closeAddModal();
        this.fetchArticles();
      },
      error: (error) => {
        console.error('Error adding article:', error);
        this.closeAddModal();
      }
    });
  }
}
