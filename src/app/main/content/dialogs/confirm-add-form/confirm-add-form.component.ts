import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'confirm-add-form',
    templateUrl: 'confirm-add-form.component.html',
    styleUrls: ['confirm-add-form.component.scss']
})
export class ConfirmAddFormComponent {
    constructor(
        public dialogRef: MatDialogRef<ConfirmAddFormComponent>,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
    ) {

    }


    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        this.dialogRef.close(true);
    }
}
