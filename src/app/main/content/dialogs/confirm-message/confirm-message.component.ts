import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'confirm-message',
    templateUrl: 'confirm-message.component.html',
    styleUrls: ['confirm-message.component.scss']
})
export class ConfirmMessageComponent {
    message = "";
    sendData = {};
    url = "";
    type = "";
    constructor(
        public dialogRef: MatDialogRef<ConfirmMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService) {
        this.message = data['message'];
        this.sendData = data['sendData'];
        this.url = data['url'];
        this.type = data['type'];
    }



    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        if (this.type == "patch")
            this.mainServ.APIServ.patch(this.url, this.sendData).subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.mainServ.globalServ.reload();
                }
            })
        else if (this.type == "put")
            this.mainServ.APIServ.put(this.url, this.sendData).subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    this.mainServ.globalServ.reload();
                }
            })
    }
}
