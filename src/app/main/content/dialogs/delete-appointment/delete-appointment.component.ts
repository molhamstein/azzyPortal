import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder } from '@angular/forms';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'delete-appointment',
    templateUrl: 'delete-appointment.component.html',
    styleUrls: ['delete-appointment.component.scss']
})
export class DeleteAppointmentComponent {
    appointment;
    constructor(
        public dialogRef: MatDialogRef<DeleteAppointmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.translationLoader.loadTranslations(english, persian);
        this.appointment = data['appointment'];

    }

    onYesClick() {
        this.mainServ.loaderSer.display(true);
        this.mainServ.APIServ.put("forms/cancelAp/" + this.appointment['meta'].forms.id, {}).subscribe((data: any) => {
            this.mainServ.loaderSer.display(false);
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.dialogRef.close();
            }
        })
    }

    close() {
        this.dialogRef.close();
    }

    visitForm() {
        this.dialogRef.close({ "isVisit": true, "id": this.appointment['meta'].forms.id });

    }
}
