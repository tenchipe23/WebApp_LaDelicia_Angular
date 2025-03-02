import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
 //Url de la api para verificar la autenticación de los usuarios
  // private authUrl = 'http://localhost:3100/api/auths/login/user';
  private token: string | null = null;

  constructor(private router: Router) { }



  login(identifier: string, password: string): Observable<any> {
    // Simulación de credenciales y roles
    if (identifier === 'carlos123@gmail.com' || identifier === 'carlos' && password === 'carloship123') {
      const mockResponse = {
        token: 'fake-jwt-token',
        user: { id: 1, username: 'admin', roles: ['admin'] },
      };
      sessionStorage.setItem('authToken', mockResponse.token);
      this.token = mockResponse.token;
      this.redirectByRole('admin'); // Redirigir basado en el rol
      return of(mockResponse);
    } else if (identifier === 'user' && password === 'password123') {
      const mockResponse = {
        token: 'fake-jwt-token-user',
        user: { id: 2, username: 'user', roles: ['user'] },
      };
      sessionStorage.setItem('authToken', mockResponse.token);
      this.token = mockResponse.token;
      this.redirectByRole('user'); // Redirigir basado en el rol
      return of(mockResponse);
    } else {
      return new Observable((observer) => {
        observer.error({ message: 'Credenciales incorrectas' });
      });
    }
  }

  isAuthenticated(): boolean {
    this.token = sessionStorage.getItem('authToken');
    return !!this.token;
  }

  hasRole(requiredRole: string): boolean {
    const roles = this.getUserRoles();
    return roles.includes(requiredRole);
  }

  private getUserRoles(): string[] {
    if (!this.token) {
      this.token = sessionStorage.getItem('authToken');
    }
    if (this.token) {
      try {
        if (this.token === 'fake-jwt-token') {
          return ['admin'];
        } else if (this.token === 'fake-jwt-token-user') {
          return ['user'];
        }
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return [];
      }
    }
    return [];
  }

  private redirectByRole(role: string): void {
    if (role === 'admin') {
      this.router.navigate(['/control-panel']); // Ruta para administradores
    } else if (role === 'user') {
      this.router.navigate(['/dashboard']); // Ruta para usuarios
    }
  }

  logout(): void {
    sessionStorage.removeItem('authToken');
    this.token = null;
    this.router.navigate(['/login']);
  }
}
