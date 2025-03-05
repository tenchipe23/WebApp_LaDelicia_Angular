import {Component, inject, OnInit} from '@angular/core';
import { NavbarComponent } from "../../../shared/navbar/navbar/navbar.component";
import { FooterComponent } from "../../../shared/footer/footer/footer.component";
import { CloudinaryService } from "../../../core/services/cloudinary.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, NgForOf, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private cloudinaryService: CloudinaryService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.cloudinaryService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product: any) => ({
          id: product.id,
          name: product.name_product,
          price: product.price_product,
          image: product.image || 'assets/panaderia_removebg_preview.png' // Imagen por defecto en caso de error
        }));
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar productos. Intenta de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }
  }
