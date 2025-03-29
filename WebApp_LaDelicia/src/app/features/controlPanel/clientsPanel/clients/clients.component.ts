import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { FooterComponent } from "../../../../shared/footer/footer/footer.component";
import { NavbarComponent } from "../../../../shared/navbar/navbar/navbar.component";
import { NgIf } from "@angular/common";
import { ClientTableComponent } from '../../../../shared/tables/client-table/client-table.component';
import { MenuComponent } from "../../../../shared/menu/menu/menu.component";
import { Modal } from "bootstrap";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, MenuComponent, NavbarComponent, ClientTableComponent, NgIf],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {
  clients: any[] = [];
  clientForm!: FormGroup;
  selectedClient: any = null;
  userIdToClient: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadUsers();
  }

  validateDateOfBirth: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }
  
    const birthDate = new Date(control.value);
    const today = new Date();
  
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
  
    const birthYear = birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
  
    const maxYear = currentYear - 105; // Año mínimo permitido
  
    // Validar que la fecha de nacimiento no esté en el futuro
    if (birthYear > currentYear || (birthYear === currentYear && (birthMonth > currentMonth || (birthMonth === currentMonth && birthDay > currentDay)))) {
      return { futureDate: true }; // Fecha futura
    }
  
    // Validar que la fecha de nacimiento no sea más antigua que 105 años
    if (birthYear < maxYear || (birthYear === maxYear && (birthMonth < currentMonth || (birthMonth === currentMonth && birthDay < currentDay)))) {
      return { tooOld: true }; // Mayor a 105 años
    }
  
    return null;
  };
  
  


  initializeForm(): void {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      first_surname: ['', Validators.required],
      last_surname: ['', Validators.required],
      city: ['', Validators.required],
      direction: ['', Validators.required],
      date_of_birth: ['', [Validators.required, this.validateDateOfBirth]], // Usamos la función de validación personalizada aquí
      postal_code: ['', Validators.required],
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
        if (!data || !Array.isArray(data.data)) {
          console.error("Error: La respuesta de la API no contiene una lista de usuarios válidos.", data);
          this.clients = [];
          return;
        }
        this.clients = data.data.map((elem: any) => {
          const authData = elem.auth || {};
          const userData = elem.user || {};
          const clientData = elem.client || {};
          return {
            id: userData.id || '',
            name: userData.name || '',
            first_surname: userData.first_surname || '',
            last_surname: userData.last_surname || '',
            phone_number: userData.phone_number || '',
            email: authData.email || '',
            username: authData.username || '',
            role: authData.role || '',
            city: clientData.city || '',
            date_of_birth: clientData.date_of_birth || '',
            postal_code: clientData.postal_code || '',
            direction: clientData.direction || '',
            id_preferred_payment_method: clientData.id_preferred_payment_method || ''
          };
        });
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.clients = [];
      }
    });
  }
  addUser(): void {
    if (this.clientForm.invalid) {
      this.toastr.warning('Por favor, complete todos los campos correctamente.', 'Advertencia');
      return;
    }

    const userData = { ...this.clientForm.value };

    this.userService.createUser(userData).subscribe({
      next: () => {
        this.toastr.success('Usuario agregado exitosamente', 'Éxito');
        this.loadUsers();
        this.clientForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al agregar usuario', 'Error');
        console.error('Error en agregar usuario:', error);
      }
    });
  }

  editUser(user: any): void {
    this.selectedClient = user;
    this.clientForm.patchValue({
      ...user,
      city: user.city,
      direction: user.direction,
      date_of_birth: user.date_of_birth,
      postal_code: user.postal_code,
      id_preferred_payment_method: user.id_preferred_payment_method
    });
  }

  updateUser(): void {
    if (!this.selectedClient) return;
  
    // Verifica si el formulario es válido antes de proceder
    if (this.clientForm.invalid) {
      this.toastr.warning('Por favor, complete todos los campos correctamente.', 'Advertencia');
      return; // Si el formulario es inválido, detiene la ejecución
    }
  
    const updatedUser = { ...this.selectedClient, ...this.clientForm.value };
  
    this.userService.updateUser(this.selectedClient.id, updatedUser).subscribe({
      next: () => {
        this.toastr.success('Usuario actualizado correctamente', 'Éxito');
        this.loadUsers();
        this.selectedClient = null;
        this.clientForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al actualizar usuario', 'Error');
        console.error('Error en actualizar usuario:', error);
      }
    });
  }
  

  confirmDelete(userId: number): void {
    this.userIdToClient = userId;
    const modalElement = document.getElementById('deleteUserModal');
    if (modalElement) {
      const modalBootstrap = Modal.getOrCreateInstance(modalElement);
      modalBootstrap.show();
    }
  }

  deleteUser(): void {
    if (!this.userIdToClient) return;

    this.userService.deleteUser(this.userIdToClient).subscribe({
      next: () => {
        const modalElement = document.getElementById('deleteUserModal');
        if (modalElement) {
          const modalBootstrap = Modal.getInstance(modalElement);
          if (modalBootstrap) {
            modalBootstrap.hide();
          }
        }
        this.userIdToClient = null;
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      }
    });
  }
}
