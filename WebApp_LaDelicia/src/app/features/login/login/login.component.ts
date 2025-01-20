import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar/navbar.component';
import { FooterComponent } from "../../../shared/footer/footer/footer.component";
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
