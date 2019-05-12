import { ResponeFormComponent } from './../../main/content/dialogs/respone-form/respone-form.component';
import { ConfirmMessageComponent } from './../../main/content/dialogs/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material';
import { Injectable } from '@angular/core';
import { MessageComponent } from '../../main/content/dialogs/message/message.component';

@Injectable()
export class DialogServiceService {

  constructor(
    public dialog: MatDialog,
  ) { }

  confirmationMessage(message, url, data, withReload, callback, type: string = "patch", token: string = "", typeConfirm: string = 'defult', moreData: object = {}) {
    let dialogRef = this.dialog.open(ConfirmMessageComponent, {
      width: '450px',
      data: { message: message, url: url, sendData: data, type: type, withReload: withReload, token: token, typeConfirm: typeConfirm, moreData: moreData }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        callback(result);
      }
    });
  }


  messageDialog(message) {
    let dialogRef = this.dialog.open(MessageComponent, {
      width: '30%',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  responseFormDialog(isAddedMessage, data: any = {}) {
    var className = "custom-modalbox"
    if (isAddedMessage == false)
      className = "false-custom-modalbox"
    let dialogRef = this.dialog.open(ResponeFormComponent, {
      width: '650px',
      panelClass: 'className',
      data: { isAddedMessage: isAddedMessage, form: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}
