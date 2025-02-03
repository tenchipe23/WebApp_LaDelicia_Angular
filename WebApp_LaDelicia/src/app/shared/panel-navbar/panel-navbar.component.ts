import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panel-navbar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './panel-navbar.component.html',
  styleUrl: './panel-navbar.component.css'
})
export class PanelNavbarComponent {
  navItems = [
    { label: 'Inicio', link: '/dashboard', active: true },
    { label: 'Productos', link: '/products', active: false },
    { label: 'Nosotros', link: '/about', active: false },
    { label: 'Contacto', link: '/contact', active: false },
    { label: 'Iniciar Sesión', link: '/login', active: false }

  ];
  user = {
    name: 'Carlos',
    photoUrl: 'assets/user_profile.png'
  };

}
