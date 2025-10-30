import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient); 
  private baseUrl = 'http://localhost:3000/users';
  currentUser = signal<any>(null);

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => users.length ? users[0] : null),
        tap(user => {
          if (user) this.currentUser.set(user);
        })
      );
  }

  signup(username: string, password: string): Observable<any> {
    const payload = { username, password, role: 'user' };
    return this.http.post(this.baseUrl, payload).pipe(
      tap((user: any) => this.currentUser.set(user))
    );
  }

  logout() {
    this.currentUser.set(null);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  getCurrentUser() {
    return this.currentUser();
  }
}
