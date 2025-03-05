import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/navbar/navbar/navbar.component';
import { FooterComponent } from "../../../shared/footer/footer/footer.component";
import {response} from "express";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FooterComponent, NavbarComponent, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private formB: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Definir los controles del formulario
    this.loginForm = this.formB.group({
      identifier: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    const { identifier, password } = this.loginForm.value;

    if (!identifier || !password) {
      this.errorMessage = 'Usuario y contraseña son requeridos';
      return;
    }

    const credentials = identifier.includes('@')
      ? { email: identifier, password }
      : { username: identifier, password };

    console.log('Enviando credenciales:', credentials);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Llamada a handleLoginResponse:', response);
        this.authService.handleLoginResponse(response);
      },
      error: (error) => {
        console.error('Error en el login:', error);
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
      },
    });
  }


  redirectToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

}
