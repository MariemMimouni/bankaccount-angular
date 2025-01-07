import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.authService.logIn(username, password).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          // Redirection vers la page des comptes après succès
          this.router.navigate(['/client']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.errorMessage = 'Invalid username or password.';
        },
      });
    }
  }
  
}
