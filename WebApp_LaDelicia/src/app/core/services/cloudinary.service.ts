import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  private apiUrl = 'http://localhost:3100/api/products/get/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener productos:', error);
        return throwError(() => new Error('Error al obtener productos'));
      })
    );
  }

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

}
