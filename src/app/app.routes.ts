import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';

export const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'create', component: CreatePostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];
