import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../../../core/services/employee.service'; // Asegúrate de importar el servicio correcto
import { EmployeeTableComponent } from "../../../../shared/tables/employee-table/employee-table.component";
import { MenuComponent } from "../../../../shared/menu/menu/menu.component";
import { FooterComponent } from "../../../../shared/footer/footer/footer.component";
import { PanelNavbarComponent } from "../../../../shared/panel-navbar/panel-navbar.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    EmployeeTableComponent,
    MenuComponent,
    FooterComponent,
    ReactiveFormsModule,
    PanelNavbarComponent
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employeeForm: FormGroup;
  employees: any[] = [];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(15)]],
      apellido: ['', [Validators.required, Validators.maxLength(15)]],
      calle: ['', [Validators.maxLength(15)]],
      ciudad: ['', [Validators.maxLength(15)]],
      codigoPostal: ['', [Validators.pattern('\\d{5}')]],
      telefono: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      salario: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.error('Error al obtener empleados:', error);
      }
    );
  }

  saveEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value;
      this.employeeService.createEmployee(newEmployee).subscribe(
        response => {
          console.log('Empleado creado exitosamente:', response);
          this.loadEmployees(); // Recargar la lista de empleados después de crear uno nuevo
          this.employeeForm.reset();
        },
        error => {
          console.error('Error al crear empleado:', error);
        }
      );
    }
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      response => {
        console.log('Empleado eliminado exitosamente:', response);
        this.loadEmployees(); // Recargar la lista de empleados después de eliminar uno
      },
      error => {
        console.error('Error al eliminar empleado:', error);
      }
    );
  }
}
