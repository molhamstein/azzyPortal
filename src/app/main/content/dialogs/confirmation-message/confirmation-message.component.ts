import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'confirmation-message',
    templateUrl: 'confirmation-message.component.html',
    styleUrls: ['confirmation-message.component.scss']
})
export class ConfirmationMessageComponent {
    message = "";
    sendData = {};
    url = "";
    constructor(
        public dialogRef: MatDialogRef<ConfirmationMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ:MainService) {
        this.message = data['message'];
        this.sendData = data['sendData'];
        this.url = data['url'];
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        console.log(this.sendData);
        console.log(this.url);
        this.mainServ.APIServ.patch(this.url,this.sendData).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.globalServ.reload();
            }
        })
    }

}
