import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from 'src/models/Compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  private apiUrl = 'http://localhost:8080/api/compte';

  constructor(private http: HttpClient) {}

  // Fetch all comptes
  getAllComptes(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.apiUrl}/all`);
  }
  
  

  // Fetch a single compte by RIB
  getCompteByRib(rib: number): Observable<Compte> {
    return this.http.get<Compte>(`${this.apiUrl}/${rib}`);
  }

  // Save a new compte
  saveCompte(rib: number, solde: number, userId: number): Observable<string> {
    const params = new HttpParams()
      .set('rib', rib.toString())
      .set('solde', solde.toString())
      .set('userId', userId.toString());

    return this.http.post<string>(`${this.apiUrl}/save`, params, { responseType: 'text' as 'json' });
  }

  // Update an existing compte
  updateCompte(rib: number, solde: number): Observable<string> {
    const params = new HttpParams()
      .set('rib', rib.toString())
      .set('solde', solde.toString());

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<string>(`${this.apiUrl}/update`, null, { params, responseType: 'text' as 'json' });
  }

  // Delete a compte by RIB
  deleteCompte(rib: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${rib}`, { responseType: 'text' as 'json' });
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/user/all');
  }
}
