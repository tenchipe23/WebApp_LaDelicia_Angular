import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private apiUrl = 'http://localhost:3100/api/products';
  //private apiUrl = 'https://6236-189-161-134-145.ngrok-free.app';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const token = sessionStorage.getItem('authToken'); // Recuperar el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/get/products`, { headers });
  }
}
