import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'reset-password',
    templateUrl: 'reset-password.component.html',
    styleUrls: ['reset-password.component.scss']
})
export class ResetPasswordComponent {
    userId
    regiForm: FormGroup;

    hide = true
    constructor(
        public dialogRef: MatDialogRef<ResetPasswordComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.userId = data['userId'];
        this.translationLoader.loadTranslations(english, persian);

    }
    ngOnInit() {
        // this.translate.use('en');

        this.regiForm = new FormGroup({
            newPassword: new FormControl('', Validators.required),
            // oldPassword: new FormControl('', Validators.required)
        });
    }

    update() {
        this.regiForm.value.userId = this.userId
        this.mainServ.APIServ.post("staffusers/resetPassword", this.regiForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.dialogRef.close(true);
            }
        })
    }
    onYesClick() {
    }
}
