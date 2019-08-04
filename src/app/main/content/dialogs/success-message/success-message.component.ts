import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'success-message',
    templateUrl: 'success-message.component.html',
    styleUrls: ['success-message.component.scss']
})
export class SuccessMessageComponent {
    constructor(
        public dialogRef: MatDialogRef<SuccessMessageComponent>
    ) {

    }


    onYesClick(): void {
        this.dialogRef.close(true);
    }
}
