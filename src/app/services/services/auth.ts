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

   private loadUserFromStorage() {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  private saveUserToStorage(user: any) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private clearUserFromStorage() {
    localStorage.removeItem('currentUser');
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}?username=${username}&password=${password}`)
      .pipe(
        map(users => users.length ? users[0] : null),
        tap(user => {
          if (user) this.currentUser.set(user);
          this.saveUserToStorage(user)
        })
      );
  }

  signup(username: string, password: string): Observable<any> {
    const payload = { username, password, role: 'user' };
    return this.http.post(this.baseUrl, payload).pipe(
      tap((user: any) => {
        this.currentUser.set(user);
        this.saveUserToStorage(user);
      })
  )};

  logout() {
    this.currentUser.set(null);
    this.clearUserFromStorage();
    
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
