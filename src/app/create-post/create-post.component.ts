import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit {
  isAdmin: boolean = false;
  articles: { title: string; content: string }[] = [];
  newArticle = {
    title: '',
    content: '',
  };

  constructor(private articleservice: ArticleService) {}

  ngOnInit(): void {
    this.getArticles();
    const role = localStorage.getItem('role');

    if (role === 'admin' || role === 'user') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  getArticles(): void {
    this.articleservice.getArticles().subscribe({
      next: (article) => {
        console.log(article);
        this.articles = article;
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }

  createArticle(article: any): void {
    console.log(article);
    this.newArticle = article;
    if (this.newArticle.title && this.newArticle.content) {
      this.articleservice.createArticle(this.newArticle).subscribe({
        next: (article) => {
          console.log(article);
          this.articles = article;
          location.reload();
        },
        error: (err) => console.error('Erreur:', err),
        complete: () => console.log('Observable terminé.'),
      });
    }
  }
}
