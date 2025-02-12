import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {

  @Input() products: any[] = [];

}
