import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  imports: [CommonModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',
})
export class CreatePostComponent implements OnInit {
  isAdmin: boolean = false;

  ngOnInit(): void {
    const role = localStorage.getItem('role');
    if (role === 'admin' || role === 'user') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
}
