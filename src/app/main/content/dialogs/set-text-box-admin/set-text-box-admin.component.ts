import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'set-text-box-admin',
    templateUrl: 'set-text-box-admin.component.html',
    styleUrls: ['set-text-box-admin.component.scss']
})
export class SetTextBoxAdminComponent {

    text
    constructor(
        public dialogRef: MatDialogRef<SetTextBoxAdminComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService) {
        this.text = data['textBoxMessage'];
    }

    onYesClick() {
        this.dialogRef.close(this.text);
    }
}
