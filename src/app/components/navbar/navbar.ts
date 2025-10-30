import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,               
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',   
})
export class Navbar {
  private auth = inject(AuthService);  
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
