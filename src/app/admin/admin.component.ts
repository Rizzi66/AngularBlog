import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  name = '';
  password = '';
  signinForm = {
    name: this.name,
    password: this.password,
  };
  isAdmin: boolean = false;

  users: { _id: string; name: string; role: string }[] = [];

  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
    if (localStorage.getItem('role') === 'admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  getUsers(): void {
    this.userservice.getUsers().subscribe({
      next: (data) => {
        console.log(data);
        this.users = data;
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }

  modifyRole(userId: string, role: string): void {
    console.log(userId + ' et ' + role);
    if (role) {
      this.userservice.modifyRole(userId, role).subscribe({
        next: (data) => {
          console.log(data);
          const user = this.users.find((user) => user._id === userId);
          if (user) {
            user.role = role;
          }
        },
        error: (err) => console.error('Erreur:', err),
        complete: () => console.log('Observable terminé.'),
      });
    }
  }

  deleteUser(userId: string): void {
    this.userservice.deleteUser(userId).subscribe({
      next: (data) => {
        console.log(data);
        location.reload();
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }
}
