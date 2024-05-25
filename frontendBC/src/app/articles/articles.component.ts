import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { Article, ArticleForCreation } from './articles.model';
import { FamilleArticle } from '../famille/famille.model';

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
  familles: FamilleArticle[] = [];
  newArticle: ArticleForCreation = new ArticleForCreation();
  selectedArticle: Article = new Article();
  showModal: boolean = false;
  showAddModal: boolean = false;
  familleId: number | null = null;
  selectedFile: File | null = null; // For file upload

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchFamilles();
    this.fetchArticles();
  }

  fetchFamilles(): void {
    this.dataService.getFamilles().subscribe({
      next: (data) => this.familles = data,
      error: (error) => console.error('Error fetching familles:', error)
    });
  }

  fetchArticles(): void {
    this.dataService.getArticles().subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('Error fetching articles:', error)
    });
  }

  deleteArticle(id: number): void {
    this.dataService.isArticleInPurchaseOrder(id).subscribe({
      next: (isInOrder) => {
        if (isInOrder) {
          alert('Cannot delete this article because it is part of a purchase order.');
        } else {
          const confirmed = confirm('Voulez-vous vraiment supprimer cet article ?');
          if (confirmed) {
            this.dataService.deleteArticle(id).subscribe({
              next: () => this.fetchArticles(),
              error: (error) => console.error('Error deleting article:', error)
            });
          }
        }
      },
      error: (error) => console.error('Error checking article in purchase order:', error)
    });
  }

  selectArticle(article: Article): void {
    this.selectedArticle = article;
    this.showModal = true;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  submitUpdate(articleData: any): void {
    if (this.selectedFile) {
      this.dataService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          articleData.imageArticle = response.url;
          this.updateArticleData(articleData);
        },
        error: (error) => {
          console.error('Error uploading image:', error);
          this.showModal = false;
        }
      });
    } else {
      this.updateArticleData(articleData);
    }
  }

  updateArticleData(articleData: any): void {
    articleData.quantite = this.selectedArticle.quantite; // Ensure quantity is included
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
    if (this.selectedFile) {
      this.dataService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          const newArticleData = {
            nomArticle: this.newArticle.nomArticle,
            description: this.newArticle.description,
            prix: this.newArticle.prix,
            quantite: this.newArticle.quantite, // Add quantity
            imageArticle: response.url, // Use the uploaded image URL
            familleArticleId: this.newArticle.familleArticleId
          };

          console.log(newArticleData);
  
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
        },
        error: (error) => console.error('Error uploading image:', error)
      });
    }
  }

  findFamile(id: number): string {
    return this.familles.find(f => f.id === id)?.nom || 'N/A';
  }
}
