  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  import { AuthService } from '../../services/auth.service';
  import { Router } from '@angular/router';


  @Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
  })
  export class SignupComponent {
    signupForm: FormGroup;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService,    private router: Router
    ) {
      this.signupForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', Validators.required]
      
      });
    }

    onSignUp(): void {
      if (this.signupForm.valid) {
        const { username, password } = this.signupForm.value;
    
        this.authService.signUp(username, password).subscribe(
          (response) => {
            console.log('Signup successful:', response);
            // Redirection vers la page de connexion
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Signup error:', error);
            if (error.error && error.error.message) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An error occurred. Please try again.';
            }
          }
        );
      }
    }
    
  }
