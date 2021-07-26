import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class InfoDialogService {

  constructor(private dialog: MatDialog) {}
    open(message: string) {
      return this.dialog.open(InfoDialogComponent, {
        data: {
          message
        }
      })
    };
}
