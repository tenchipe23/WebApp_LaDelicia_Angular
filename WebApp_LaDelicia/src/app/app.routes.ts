import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './features/login/login/login.component';
import { AboutUsComponent } from './features/about/about-us/about-us.component';
import { ContactusComponent } from './features/contact_us/contactus/contactus.component';
import { ProductsComponent } from './features/products/products/products.component';
import { ForgotPasswordComponent } from './shared/forgotPassword/forgot-password/forgot-password.component';
import { ClientsComponent } from './features/controlPanel/clientsPanel/clients/clients.component';
import { EmployeesComponent } from './features/controlPanel/employeesPanel/employees/employees.component';
import { ProductsPanelComponent } from './features/controlPanel/productsPanel/products-panel/products-panel.component';
import { UsersComponent } from './features/controlPanel/usersPanel/users/users.component';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'contact', component: ContactusComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    {
        path: 'control-panel',
        canActivate: [authGuard], // Protección para toda la sección
        data: { role: 'admin' }, // Restricción por rol
        children: [
            { path: '', redirectTo: 'users', pathMatch: 'full' },
            { path: 'clients', component: ClientsComponent, canActivate: [authGuard], data: { role: 'admin' } },
            { path: 'employees', component: EmployeesComponent, canActivate: [authGuard], data: { role: 'admin' } },
            { path: 'product-panel', component: ProductsPanelComponent, canActivate: [authGuard], data: { role: 'admin' } },
            { path: 'users', component: UsersComponent, canActivate: [authGuard], data: { role: 'admin' } },

        ]
    },
    { path: '**', redirectTo: 'dashboard' },
];

