import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
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
        this.userservice.setUserName(this.name);
        this.router.navigateByUrl('/');
      },
      error: (err) => console.error('Erreur:', err),
      complete: () => console.log('Observable terminé.'),
    });
  }
}
