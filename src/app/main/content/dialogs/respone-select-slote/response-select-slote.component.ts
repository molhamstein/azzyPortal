import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material';
import { Component } from '@angular/core';

@Component({
    selector: 'response-select-slote',
    templateUrl: 'response-select-slote.component.html',
    styleUrls: ['response-select-slote.component.scss']
})
export class ResponseSelectSloteComponent {
    constructor(
        public dialogRef: MatDialogRef<ResponseSelectSloteComponent>,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
    ) {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
