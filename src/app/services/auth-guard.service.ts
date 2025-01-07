import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

constructor(private loginService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.loginService.isAuthenticated()) {
      return true;
    } else {
      // L'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
      this.router.navigate(['/']);
      return false;
    }
  }}
