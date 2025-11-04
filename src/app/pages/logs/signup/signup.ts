import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CommonModule} from '@angular/common';
import { AuthService } from '../../../services/services/auth';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,RouterLink,CommonModule
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirm: new FormControl('')
  });
  error = '';

  constructor(private auth: AuthService, private router: Router) {
  }

  onSubmit() {
    const {username, password, confirm} = this.form.value;
    if (!username || !password || password !== confirm) {
      this.error = 'Please fill fields correctly';
      return;
    }
    this.auth.signup(username, password).subscribe({
      next: user => {
        // Signup success
        this.router.navigateByUrl('/user/dashboard');
      },
      error: err => {
        console.error('Signup failed:', err);
        this.error = 'Signup failed, please try again.';
      },
      complete: () => {
        console.log('Signup request completed.');
      }
    });
  }
}
