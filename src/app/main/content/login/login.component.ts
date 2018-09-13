import { FuseTranslationLoaderService } from './../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { fuseAnimations } from './../../../core/animations';
import { FuseConfigService } from './../../../core/services/config.service';
import { MainService } from './../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';

import { locale as english } from '../languageFiles/en';
import { locale as persian } from '../languageFiles/fa';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations
})
export class FuseLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private mainServ: MainService,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.translationLoader.loadTranslations(english, persian);
        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none'
            }
        });

        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }

    ngOnInit() {
        this.translate.use('en');
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    login() {
        console.log(this.loginForm.value);
        this.mainServ.APIServ.post("staffusers/login?include=user", this.loginForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.loginServ.logIn(data, true)
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                // this.mainServ.globalServ.somthingError();
            }

        });

    }
}
