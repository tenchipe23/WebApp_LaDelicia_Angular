import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {EmployeeTableComponent} from "../../../../shared/tables/employee-table/employee-table.component";
import {MenuComponent} from "../../../../shared/menu/menu/menu.component";
import {FooterComponent} from "../../../../shared/footer/footer/footer.component";
import {PanelNavbarComponent} from "../../../../shared/panel-navbar/panel-navbar.component";

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
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  employeeForm: FormGroup;
  employees: any[] = [];

  constructor(private fb: FormBuilder) {
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

  saveEmployee() {
    if (this.employeeForm.valid) {
      this.employees.push(this.employeeForm.value);
      this.employeeForm.reset();
    }
  }

}
