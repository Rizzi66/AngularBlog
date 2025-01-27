import { computed, effect, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token, User } from '../interface/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:4000/api/';
  private name = signal('');

  constructor(private http: HttpClient) {}

  logUser(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}login`, user);
  }
  createUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}createUser`, user);
  }

  getUserName(): string {
    return this.name();
  }
  setUserName(username: string): void {
    this.name.set(username);
  }
}
