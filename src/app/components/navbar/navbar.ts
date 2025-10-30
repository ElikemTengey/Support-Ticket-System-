import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { authGuard } from '../../guards/auth-guard';

@Component({
  selector: 'app-navbar',
  standalone: true,               
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',   
})
export class Navbar {
  private auth = inject(authGuard);
  private router = inject(Router);

  get loggedIn() {
    return this.auth.isLoggedIn();
  }

  get isAdmin() {
    return this.auth.isAdmin();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
