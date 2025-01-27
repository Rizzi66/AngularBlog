import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ControlContainer, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  name = '';
  password = '';
  signinForm = {
    name: this.name,
    password: this.password,
  };

  constructor(private userservice: UserService, private router: Router) {}

  onSubmit(signinForm: ControlContainer) {
    this.userservice.logUser(signinForm.value).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        this.userservice.setUserName(this.name);
        this.router.navigateByUrl('/');
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }
}
