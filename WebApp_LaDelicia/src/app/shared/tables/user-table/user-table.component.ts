import {Component, Input, Output, EventEmitter} from '@angular/core';
import { NgForOf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [
    NgForOf,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
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
