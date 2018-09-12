import { Router } from '@angular/router';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

@Component({
    selector: 'respone-form',
    templateUrl: 'respone-form.component.html',
    styleUrls: ['respone-form.component.scss']
})
export class ResponeFormComponent {

    isAddedMessage;
    form
    url
    constructor(
        public dialogRef: MatDialogRef<ResponeFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private router: Router) {
        this.isAddedMessage = data['isAddedMessage']
        if (this.isAddedMessage) {
            this.form = data['form'];
            var baseURl = window.location.href.substring(0, window.location.href.indexOf("/addForm"))
            this.url = baseURl + "/edit-client/" + this.form['id'] + "/" + this.form['token']
        }
    }



    onNoClick(): void {
        this.dialogRef.close();
    }


}

