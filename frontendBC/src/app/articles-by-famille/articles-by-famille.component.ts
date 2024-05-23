import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { Article } from '../articles/articles.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-articles-by-famille',
  templateUrl: './articles-by-famille.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./articles-by-famille.component.css']
})
export class ArticlesByFamilleComponent implements OnInit {
  familleId!: number;
  articles: Article[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.familleId = +params.get('familleId')!;
      this.fetchArticlesByFamille();
    });
  }

  fetchArticlesByFamille(): void {
    this.dataService.getArticlesByFamille(this.familleId).subscribe({
      next: (data) => this.articles = data,
      error: (error) => console.error('Error fetching articles:', error)
    });
  }
}
