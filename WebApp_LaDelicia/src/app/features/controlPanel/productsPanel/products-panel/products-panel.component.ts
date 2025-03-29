import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../../shared/footer/footer/footer.component";
import { MenuComponent } from "../../../../shared/menu/menu/menu.component";
import { PanelNavbarComponent } from "../../../../shared/panel-navbar/panel-navbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductTableComponent } from "../../../../shared/tables/product-table/product-table.component";
import { CloudinaryService } from '../../../../core/services/cloudinary.service';
import { ToastrService } from "ngx-toastr";
import { CommonModule, NgIf } from "@angular/common";
import { Modal } from "bootstrap";
import { NavbarComponent } from '../../../../shared/navbar/navbar/navbar.component';
import {CopyrightComponent} from "../../../../shared/copyright/copyright.component";
import {SidebarPanelComponent} from "../../../../shared/sidebar-panel/sidebar-panel.component";

@Component({
  selector: 'app-products-panel',
  standalone: true,
  imports: [
    FooterComponent,
    NavbarComponent,
    MenuComponent,
    ReactiveFormsModule,
    ProductTableComponent,
    NgIf,
    CommonModule,
    CopyrightComponent,
    SidebarPanelComponent
  ],
  templateUrl: './products-panel.component.html',
  styleUrls: ['./products-panel.component.css']
})
export class ProductsPanelComponent implements OnInit {

  products: any[] = [];
  sidebarOpen = false;
  productForm!: FormGroup;
  selectedProduct: any = null; // Si es nulo se agrega, si no se edita
  productIdToDelete: number | null = null;

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadProducts();
  }

  initializeForm(): void {
    this.productForm = this.fb.group({
      name_product: ['', Validators.required],
      price_product: ['', [Validators.required, Validators.min(0)]],
      categoryid: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(0)]],
      ingredients: ['', Validators.required],
      baking_time: ['', Validators.required],
      image: [null, Validators.required] // Campo para la imagen
    });
  }

  loadProducts(): void {
    this.cloudinaryService.getProducts().subscribe({
      next: (response) => {
        console.log('Productos obtenidos:', response);
        this.products = response.map((productObj: any) => ({
          id: productObj.id,
          name_product: productObj.name_product,
          price_product: productObj.price_product,
          categoryid: productObj.categoryid,
          stock: productObj.stock,
          ingredients: productObj.ingredients,
          baking_time: productObj.baking_time,
          image: productObj.image
        }));
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.toastr.error('No se pudieron cargar los productos.', 'Error');
      },
    });
  }

  addProduct(): void {
    if (this.productForm.invalid) {
      this.toastr.warning('Por favor, complete todos los campos correctamente.', 'Advertencia');
      return;
    }

    const productData = { ...this.productForm.value };
    const imageFile = this.productForm.get('image')?.value;

    // Verifica que el archivo sea una imagen
    if (!imageFile || !imageFile.type.startsWith('image/')) {
      this.toastr.warning('Por favor, selecciona un archivo de imagen válido (jpg, png, gif, etc.).', 'Advertencia');
      return;
    }

    this.cloudinaryService.createProduct(productData, imageFile).subscribe({
      next: (response) => {
        this.toastr.success('Producto agregado exitosamente', 'Éxito');
        this.loadProducts(); // Recargar la lista de productos
        this.productForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al agregar producto', 'Error');
        console.error('Error en agregar producto:', error);
      }
    });
  }

  editProduct(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.selectedProduct = product;
      this.productForm.patchValue({
        name_product: product.name_product,
        price_product: product.price_product,
        categoryid: product.categoryid,
        stock: product.stock,
        ingredients: product.ingredients,
        baking_time: product.baking_time,
        image: null // No prellenamos la imagen para evitar problemas
      });
    }
  }

  updateProduct(): void {
    if (!this.selectedProduct) return;

    const updatedProduct = { ...this.selectedProduct, ...this.productForm.value };
    const imageFile = this.productForm.get('image')?.value;

    // Verifica que el archivo sea una imagen
    if (imageFile && !imageFile.type.startsWith('image/')) {
      this.toastr.warning('Por favor, selecciona un archivo de imagen válido (jpg, png, gif, etc.).', 'Advertencia');
      return;
    }

    const payload = {
      ...updatedProduct,
      image: imageFile
    };

    this.cloudinaryService.updateProduct(payload).subscribe({
      next: () => {
        this.toastr.success('Producto actualizado correctamente', 'Éxito');
        this.loadProducts();
        this.selectedProduct = null;
        this.productForm.reset();
      },
      error: (error) => {
        this.toastr.error('Error al actualizar producto', 'Error');
        console.error('Error en actualizar producto:', error);
      }
    });
  }

  confirmDelete(productId: number): void {
    this.productIdToDelete = productId;

    // Abre la modal (id="deleteModal") con la API de Bootstrap
    const modalElement = document.getElementById('deleteModal');
    if (modalElement) {
      const modalBootstrap = Modal.getOrCreateInstance(modalElement);
      modalBootstrap.show();
    }
  }

  deleteProduct(): void {
    if (!this.productIdToDelete) return;

    this.cloudinaryService.deleteProduct(this.productIdToDelete.toString()).subscribe({
      next: () => {
        // Cerrar modal
        const modalElement = document.getElementById('deleteModal');
        if (modalElement) {
          const modalBootstrap = Modal.getInstance(modalElement);
          if (modalBootstrap) {
            modalBootstrap.hide();
          }
        }
        // Limpia variable y recarga la lista
        this.productIdToDelete = null;
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        this.toastr.error('Error al eliminar producto', 'Error');
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Valida el tipo de archivo
      if (!file.type.startsWith('image/')) {
        this.toastr.warning('Por favor, selecciona un archivo de imagen válido (jpg, png, gif, etc.).', 'Advertencia');
        this.productForm.get('image')?.setErrors({ invalidFileType: true }); // Marca el campo como inválido
        return;
      }

      // Si el archivo es válido, actualiza el valor del campo 'image' en el formulario
      this.productForm.get('image')?.setValue(file);
      this.productForm.get('image')?.setErrors(null); // Limpia los errores
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
