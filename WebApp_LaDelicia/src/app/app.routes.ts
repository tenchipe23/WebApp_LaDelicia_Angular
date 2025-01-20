import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login/login.component';
import { AboutUsComponent } from './features/about/about-us/about-us.component';
import { ContactusComponent } from './features/contact_us/contactus/contactus.component';
import { ProductsComponent } from './features/products/products/products.component';
import { ForgotPasswordComponent } from './shared/forgotPassword/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactusComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', redirectTo: 'dashboard'},
];

