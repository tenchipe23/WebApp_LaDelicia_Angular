import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3004/employees';
  private token: string | null = null;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getAllEmployees(): Observable<any> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al obtener empleados:', error);
            return of([]); // Devuelve un array vacío en caso de error
          })
        );
    } else {
      console.error('Token no disponible.');
      return of([]); // Devuelve un array vacío si no hay token
    }
  }

  createEmployee(employee: any): Observable<any> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.post<any>(this.apiUrl, employee, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al crear empleado:', error);
            return of(null);
          })
        );
    } else {
      console.error('Token no disponible.');
      return of(null);
    }
  }

  getEmployeeById(id: number): Observable<any> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al obtener empleado por ID:', error);
            return of(null);
          })
        );
    } else {
      console.error('Token no disponible.');
      return of(null);
    }
  }

  getEmployeeByName(name: string): Observable<any[]> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.get<any[]>(`${this.apiUrl}?name=${name}`, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al obtener empleado por nombre:', error);
            return of([]);
          })
        );
    } else {
      console.error('Token no disponible.');
      return of([]);
    }
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.put<any>(`${this.apiUrl}/${id}`, employee, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al actualizar empleado:', error);
            return of(null);
          })
        );
    } else {
      console.error('Token no disponible.');
      return of(null);
    }
  }

  deleteEmployee(id: number): Observable<any> {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }

    if (this.token) {
      return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() })
        .pipe(
          catchError(error => {
            console.error('Error al eliminar empleado:', error);
            return of(null);
          })
        );
    } else {
      console.error('Token no disponible.');
      return of(null);
    }
  }
}
