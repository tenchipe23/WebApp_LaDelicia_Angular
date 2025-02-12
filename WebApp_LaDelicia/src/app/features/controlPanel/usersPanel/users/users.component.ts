import { Component } from '@angular/core';
import {PanelNavbarComponent} from "../../../../shared/panel-navbar/panel-navbar.component";
import {UserTableComponent} from "../../../../shared/tables/user-table/user-table.component";
import {MenuComponent} from "../../../../shared/menu/menu/menu.component";
import {FooterComponent} from "../../../../shared/footer/footer/footer.component";

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
export class UsersComponent {
  user = [
    { nombre: 'Roberto', username: 'roberthz' },
    { nombre: 'Carlos', username: 'carlos26' },
    { nombre: 'Enrique', username: 'kikez' },
    { nombre: 'Gael', username: 'gaelo' },

  ];
}
