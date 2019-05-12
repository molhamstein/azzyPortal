import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'message',
    templateUrl: 'message.component.html',
    styleUrls: ['message.component.scss']
})
export class MessageComponent {
    message = "";
    sendData = {};
    url = "";
    type = "";
    withReload = true;
    token;
    constructor(
        public dialogRef: MatDialogRef<MessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
        private mainServ: MainService) {
        this.message = data['message'];
        this.translationLoader.loadTranslations(english, persian);

    }



    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        // this.translate.use('en');
    }
}
