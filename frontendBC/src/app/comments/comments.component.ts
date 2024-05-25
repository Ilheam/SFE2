import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { Comment } from './comments.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  commentForm: FormGroup;
  editMode: boolean = false;
  editCommentId: number | null = null;

  constructor(private fb: FormBuilder, private dataService: DataService, private authService: AuthService) {
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.dataService.getComments().subscribe({
      next: (data: Comment[]) => this.comments = data,
      error: (error: any) => {
        console.error('Error fetching comments:', error);
        alert('Error fetching comments: ' + error.message);
      }
    });
  }

  submitComment(): void {
    if (this.commentForm.valid) {
      const newComment: Comment = {
        id: this.editCommentId ?? 0,
        text: this.commentForm.value.text,
        created: new Date(),
        userId: this.authService.getCurrentUserId()!,
        user: {
          id: this.authService.getCurrentUserId()!,
          email: '' // You may need to fetch and set the current user's email if required
        }
      };

      if (this.editMode && this.editCommentId !== null) {
        this.dataService.updateComment(this.editCommentId, newComment).subscribe({
          next: () => {
            this.fetchComments();
            this.commentForm.reset();
            this.editMode = false;
            this.editCommentId = null;
          },
          error: (error: any) => {
            console.error('Error updating comment:', error);
            alert('Error updating comment: ' + error.message);
          }
        });
      } else {
        this.dataService.addComment(newComment).subscribe({
          next: () => {
            this.fetchComments();
            this.commentForm.reset();
          },
          error: (error: any) => console.error('Error adding comment:', error)
        });
      }
    }
  }

  editComment(comment: Comment): void {
    this.editMode = true;
    this.editCommentId = comment.id;
    this.commentForm.patchValue({ text: comment.text });
  }

  deleteComment(id: number): void {
    this.dataService.deleteComment(id).subscribe({
      next: () => this.fetchComments(),
      error: (error: any) => console.error('Error deleting comment:', error)
    });
  }
}
