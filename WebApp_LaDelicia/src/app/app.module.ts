import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './features/login/login/login.component';
import { AboutUsComponent } from './features/about/about-us/about-us.component';
import { ContactusComponent } from './features/contact_us/contactus/contactus.component';
import { ProductsComponent } from './features/products/products/products.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'about', component: AboutUsComponent }, 
      { path: 'contact', component: ContactusComponent },
      { path: 'products', component: ProductsComponent },
      { path: '**', redirectTo: 'dashboard'},
   
  ])
  ],
})
export class AppModule { }
