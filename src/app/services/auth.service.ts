import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) {}

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { username, password }, { headers }).pipe(
        tap((response: any) => {
          // Stocker l'identifiant de l'employé dans le localStorage
          localStorage.setItem('username', response.username);
        })
      );
  }
  isAuthenticated(): boolean {
    // Vérifier si l'identifiant de l'employé est présent dans le localStorage
    return !!localStorage.getItem('username');
  }
  logout(): void {
    // Supprimer l'identifiant de l'employé du localStorage
    localStorage.removeItem('username');
    // Rediriger vers la page de connexion
    this.router.navigate(['/']);
  }

  signUp(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, { username, password }, { headers });
  }
}
