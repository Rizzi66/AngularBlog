import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ControlContainer, FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../interface/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignUpComponent {
  message = '';
  name = '';
  password = '';
  signupForm = {
    name: this.name,
    password: this.password,
  };

  constructor(private userservice: UserService, private router: Router) {}

  onSubmit(signupForm: ControlContainer) {
    this.userservice.createUser(signupForm.value).subscribe({
      next: (data) => {
        console.log(data.message);
        this.message = data.message;
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 2000);
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }
}
