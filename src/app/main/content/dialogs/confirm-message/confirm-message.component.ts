import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

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
    withReload = true;
    constructor(
        public dialogRef: MatDialogRef<ConfirmMessageComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
        private mainServ: MainService) {
        this.message = data['message'];
        this.sendData = data['sendData'];
        this.url = data['url'];
        this.type = data['type'];
        this.withReload = data['withReload'];
        this.translationLoader.loadTranslations(english, persian);

    }



    onNoClick(): void {
        this.dialogRef.close();
    }

    onYesClick() {
        if (this.type == "patch")
            this.mainServ.APIServ.patch(this.url, this.sendData).subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    if (this.withReload)
                        this.mainServ.globalServ.reload();
                    else
                        this.dialogRef.close(true);

                }
            })
        else if (this.type == "put")
            this.mainServ.APIServ.put(this.url, this.sendData).subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                    if (this.withReload)
                        this.mainServ.globalServ.reload();
                    else
                        this.dialogRef.close(true);

                }
            })
    }
    ngOnInit() {
        this.translate.use('en');
    }
}
