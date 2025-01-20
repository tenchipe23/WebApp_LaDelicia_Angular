import { Component } from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer/footer.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
