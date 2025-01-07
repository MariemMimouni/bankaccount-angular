import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  saveCompte(compte: Compte): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<string>(`${this.apiUrl}/save`, compte, { headers });
  }

  // Update an existing compte
  updateCompte(rib: number, solde: number): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<string>(`${this.apiUrl}/update`, { rib, solde }, { headers });
  }

  // Delete a compte by RIB
  deleteCompte(rib: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${rib}`);
  }
}
