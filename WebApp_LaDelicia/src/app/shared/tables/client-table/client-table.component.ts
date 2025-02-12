import {Component, Input} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {

  @Input() clients: any[] = [];

}
