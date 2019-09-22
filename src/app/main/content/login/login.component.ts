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
    loader = false;
    message;
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
        // this.translate.use('en');
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            ttl:[31536000000]
        });
        if (this.mainServ.APIServ.getErrorCode() == 401) {
            this.mainServ.loaderSer.display(false)
            this.mainServ.APIServ.setErrorCode(0)
        }
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
        this.loader = true;
        this.mainServ.APIServ.post("staffusers/login?include=user", this.loginForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.mainServ.loginServ.logIn(data, true)
            }
            else if (this.mainServ.APIServ.getErrorCode() == 401) {
                this.loader = false;
                if (this.mainServ.APIServ.getCode() == "LOGIN_FAILED_EMAIL_NOT_VERIFIED") {
                    this.message = "Check You Email And Verified";
                }
                else if (this.mainServ.APIServ.getCode() == "LOGIN_FAILED") {
                    this.message = "Email or Password is wrong";
                }
                this.mainServ.APIServ.setErrorCode(0);
            }
            else {
                this.loader = false;
                this.mainServ.APIServ.setErrorCode(0);
                // this.mainServ.globalServ.somthingError();
            }

        });

    }
}
