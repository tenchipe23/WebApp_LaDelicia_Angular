import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { PanelNavbarComponent } from '../../../../shared/panel-navbar/panel-navbar.component';
import { UserTableComponent } from '../../../../shared/tables/user-table/user-table.component';
import { MenuComponent } from '../../../../shared/menu/menu/menu.component';
import { FooterComponent } from '../../../../shared/footer/footer/footer.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    PanelNavbarComponent,
    UserTableComponent,
    MenuComponent,
    FooterComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
  }

  addUser(event: Event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const username = (document.getElementById('usuario') as HTMLInputElement).value.trim();
    const email = (document.getElementById('correo') as HTMLInputElement).value.trim();
    const password = (document.getElementById('contraseña') as HTMLInputElement).value.trim();

    if (username && email && password) {
      this.userService.createUser({ username, email, password }).subscribe(
        () => {
          this.loadUsers(); // Recargar la lista de usuarios
          (document.getElementById('userForm') as HTMLFormElement).reset(); // Limpiar formulario
        },
        (error) => {
          console.error('Error al agregar usuario', error);
        }
      );
    } else {
      console.warn('Todos los campos son obligatorios');
    }
  }
}
