import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelNavbarComponent } from '../../../../shared/panel-navbar/panel-navbar.component';
import { MenuComponent } from '../../../../shared/menu/menu/menu.component';
import { FooterComponent } from '../../../../shared/footer/footer/footer.component';
import { ClientTableComponent } from '../../../../shared/tables/client-table/client-table.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, MenuComponent, PanelNavbarComponent, ClientTableComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients = [
    { nombre: 'Roberto', apellido: 'Herrera', calle: 'Calle 4', ciudad: 'Cuitlahuac', codigoPostal: '20422', telefono: '274 111 9206', salario: 3000 },
    { nombre: 'Luz', apellido: 'Arroyo', calle: 'Calle 12', ciudad: 'Tezonapa', codigoPostal: '89403', telefono: '274 762 0284', salario: 2500 },
    { nombre: 'Brenda', apellido: 'Rivera', calle: 'Calle 2', ciudad: 'Cordoba', codigoPostal: '68293', telefono: '272 265 6720', salario: 2000 },
    { nombre: 'Nallely', apellido: 'Olivo', calle: 'Calle 5', ciudad: 'Cordoba', codigoPostal: '13382', telefono: '274 377 6933', salario: 2500 },
  ];
}
