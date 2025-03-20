import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import {FooterComponent} from "../../../../shared/footer/footer/footer.component";
import {NavbarComponent} from "../../../../shared/navbar/navbar/navbar.component";
import {NgIf} from "@angular/common";
import {UserTableComponent} from "../../../../shared/tables/user-table/user-table.component";
import {MenuComponent} from "../../../../shared/menu/menu/menu.component";
import {Modal} from "bootstrap";

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  imports: [
    FooterComponent,
    NavbarComponent,
    ReactiveFormsModule,
    NgIf,
    UserTableComponent,
    MenuComponent
  ],
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  userForm!: FormGroup;
  selectedUser: any = null; // si es nulo se agrega, si no se edita
  userIdToDelete: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
  }

  initializeForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      first_surname: ['', Validators.required],
      last_surname: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data: any) => {
        console.log('Datos obtenidos de la API:', data);

        // 1. Verificamos que data.users sea un array
        if (!data || !Array.isArray(data.users)) {
          console.error("Error: La respuesta de la API no contiene una lista de usuarios válidos.", data);
          this.users = [];
          return;
        }

        // 2. Convertimos cada elemento { auth: {...}, user: {...} }
        //    en un objeto plano que la tabla entienda.
        this.users = data.users.map((elem: any) => {
          const authData = elem.auth || {};
          const userData = elem.user || {};

          return {
            // ID real para editar/eliminar
            id: userData.id || '',

            // Campos que estaban en 'user'
            name: userData.name || '',
            first_surname: userData.first_surname || '',
            last_surname: userData.last_surname || '',
            phone_number: userData.phone_number || '',

            // Campos que estaban en 'auth'
            email: authData.email || '',
            username: authData.username || '',
            role: authData.role || '',

            // Si quieres mostrar la contraseña real, usa authData.password
            // pero es común no mostrarla en claro.
            password: ''
          };
        });
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.users = [];
      }
    });
  }


  addUser(): void {
    if (this.userForm.invalid) {
      this.toastr.warning('Por favor, complete todos los campos correctamente.', 'Advertencia');
      return;
    }

    const userData = { ...this.userForm.value };

    this.userService.createUser(userData).subscribe({
      next: (response) => {
        this.toastr.success('Usuario agregado exitosamente', 'Éxito');
        this.loadUsers(); // Recargar la lista de usuarios
        this.userForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al agregar usuario', 'Error');
        console.error('Error en agregar usuario:', error);
      }
    });
  }




  editUser(user: any): void {
    this.selectedUser = user;
    this.userForm.patchValue(user);
  }

  /**
   * Método para actualizar usuario.
   */
  updateUser(): void {
    if (!this.selectedUser) return;

    const updatedUser = { ...this.selectedUser, ...this.userForm.value };

    this.userService.updateUser(this.selectedUser.id, updatedUser).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.loadUsers();
        this.selectedUser = null;
        this.userForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al actualizar usuario', 'Error');
        console.error('Error en actualizar usuario:', error);
      }
    });
  }

  confirmDelete(userId: number): void {
    this.userIdToDelete = userId;

    // Abre la modal (id="deleteUserModal") con la API de Bootstrap
    const modalElement = document.getElementById('deleteUserModal');
    if (modalElement) {
      const modalBootstrap = Modal.getOrCreateInstance(modalElement);
      modalBootstrap.show();
    }
  }

  /**
   * Método para eliminar usuario de manera lógica.
   */
  // =========================================================
  deleteUser(): void {
    if (!this.userIdToDelete) return;

    this.userService.deleteUser(this.userIdToDelete).subscribe({
      next: () => {
        // Cerrar modal
        const modalElement = document.getElementById('deleteUserModal');
        if (modalElement) {
          const modalBootstrap = Modal.getInstance(modalElement);
          if (modalBootstrap) {
            modalBootstrap.hide();
          }
        }
        // Limpia variable y recarga la lista
        this.userIdToDelete = null;
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }

}
