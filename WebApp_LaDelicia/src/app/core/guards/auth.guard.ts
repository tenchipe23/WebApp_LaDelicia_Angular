import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    const requiredRole = route.data?.['role']; // Obtén el rol requerido
    if (!requiredRole || authService.hasRole(requiredRole)) {
      return true; // Usuario autenticado y con el rol necesario
    }
    console.warn('Acceso denegado: rol insuficiente');
    return false; // Usuario no tiene el rol necesario
  }

  console.warn('Acceso denegado: usuario no autenticado');
  return false; // Usuario no está autenticado

};
