import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';

import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'view-appointment',
    templateUrl: 'view-appointment.component.html',
    styleUrls: ['view-appointment.component.scss']
})
export class ViewAppointmentComponent {
    appointment
    constructor(
        public dialogRef: MatDialogRef<ViewAppointmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

        private mainServ: MainService,
    ) {

    this.translationLoader.loadTranslations(english, persian);

        this.appointment = data['appointment'];
    }

    click(isUse) {
        this.dialogRef.close(isUse);
    }

    ngOnInit() {
        this.translate.use('en');
    }
}
