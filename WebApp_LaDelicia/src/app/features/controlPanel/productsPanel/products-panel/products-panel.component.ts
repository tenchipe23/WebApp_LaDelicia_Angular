import { Component } from '@angular/core';
import {FooterComponent} from "../../../../shared/footer/footer/footer.component";
import {MenuComponent} from "../../../../shared/menu/menu/menu.component";
import {PanelNavbarComponent} from "../../../../shared/panel-navbar/panel-navbar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ProductTableComponent} from "../../../../shared/tables/product-table/product-table.component";

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [
    FooterComponent,
    MenuComponent,
    PanelNavbarComponent,
    ReactiveFormsModule,
    ProductTableComponent
  ],
  templateUrl: './products-panel.component.html',
  styleUrl: './products-panel.component.css'
})
export class ProductsPanelComponent {

  product = [
    { nombre: 'Concha', precio: '$15' },
    { nombre: 'Polvorón', precio: '$10' },
    { nombre: 'Payaso', precio: '$15' },
    { nombre: 'Bolillo', precio: '$6' },

  ];
}
