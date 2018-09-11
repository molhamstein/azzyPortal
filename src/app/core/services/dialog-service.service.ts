import { ConfirmMessageComponent } from './../../main/content/dialogs/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogServiceService {

  constructor(
    public dialog: MatDialog,
  ) { }

  confirmationMessage(message, url, data) {
    let dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '250px',
      data: { message: message, url: url, sendData: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(result);
      }
    });
  }
}
