import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/navbar/navbar/navbar.component';
import { FooterComponent } from "../../../shared/footer/footer/footer.component";
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
    this.authService.login(identifier, password).subscribe({
      next: () => {
        //  Redirigir a la página de inicio de sesión después de iniciar sesión exitosamente
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }

}
