import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`, { responseType: 'text' as 'json' });
  }
  
   // Save a new user
   saveUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/save`, user, { responseType: 'text' as 'json' });
  }
  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`, { responseType: 'text' as 'json' });
  }

  // Delete a user via AJAX (same as the delete function, just different endpoint)
  deleteUserAjax(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete-ajax/${id}`, { responseType: 'text' as 'json' });
  }
  // Get user by ID (for editing)
  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/edit/${id}`, { responseType: 'text' as 'json' });
  }

  // Update a user
  updateUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/update`, user, { responseType: 'text' as 'json' });
  }
}
