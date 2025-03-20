import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CurrencyPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent {

 // @Input() clients: any[] = [];
 @Input() users: any[] = [];
 @Output() editUserEvent = new EventEmitter<any>();
  @Output() deleteUserEvent = new EventEmitter<number>();

  abrirModal(user: any): void {
    this.editUserEvent.emit(user);
  }

  abrirModalEliminar(userId: number): void {
    this.deleteUserEvent.emit(userId);
  }
}


