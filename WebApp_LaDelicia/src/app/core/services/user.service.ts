import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';
  

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, userData, { headers: this.getHeaders() });
  }

  createUserMobile(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createMobile`, userData, { headers: this.getHeaders() });
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/findAll`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/findById/${id}`, { headers: this.getHeaders() });
  }

  getUserByName(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/findByUserName/${name}`, { headers: this.getHeaders() });
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${id}`, userData, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}
