import { ResponeFormComponent } from './../../main/content/dialogs/respone-form/respone-form.component';
import { ConfirmMessageComponent } from './../../main/content/dialogs/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DialogServiceService {

  constructor(
    public dialog: MatDialog,
  ) { }

  confirmationMessage(message, url, data, withReload, callback, type: string = "patch", token: string = "patch") {
    let dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '250px',
      data: { message: message, url: url, sendData: data, type: type, withReload: withReload, token: token }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback();
      }
    });
  }


  responseFormDialog(isAddedMessage, data: any = {}) {
    let dialogRef = this.dialog.open(ResponeFormComponent, {
      width: '650px',
      data: { isAddedMessage: isAddedMessage, form: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        alert(result);
      }
    });
  }
}
