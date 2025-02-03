import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PanelNavbarComponent } from '../../../../shared/panel-navbar/panel-navbar.component';
import { MenuComponent } from '../../../../shared/menu/menu/menu.component';
import { FooterComponent } from '../../../../shared/footer/footer/footer.component';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ ReactiveFormsModule, MenuComponent, FooterComponent, PanelNavbarComponent ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {

}
