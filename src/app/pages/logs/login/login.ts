import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../../services/services/auth';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  
})
export class Login {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const { username, password } = this.form.value;

    if (!username || !password) {
      this.error = 'Username and password are required.';
      return;
    }

    this.auth.login(username, password).subscribe({
      // --- 'next' callback ---
      next: (users: any[]) => {
        if (users.length === 0) {
          this.error = 'Invalid credentials';
          return;
        }

        const user = users[0];

        if (user.role === 'admin') {
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.router.navigateByUrl('/user/dashboard');
        }
      },

      // --- 'error' callback ---
      error: () => this.error = 'Login failed'
    });
  }
}
