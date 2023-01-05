import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';


@Component({
    selector: 'set-text-box-admin',
    templateUrl: 'set-text-box-admin.component.html',
    styleUrls: ['set-text-box-admin.component.scss']
})
export class SetTextBoxAdminComponent {

    text
    textBox
    isWithID
    regiForm: FormGroup;
    clients
    typeUser
    isContract
    contractTypes
    constructor(
        public dialogRef: MatDialogRef<SetTextBoxAdminComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.text = data['textBoxMessage'];
        this.isWithID = data['isWithID'];
        this.isContract = data['isContract'];
        this.translationLoader.loadTranslations(english, persian);
    }
    ngOnInit() {
        // this.translate.use('en');

        if (this.isWithID) {
            this.regiForm = new FormGroup({
                textBoxAdmin: new FormControl(this.text),
                consId: new FormControl('', Validators.required),
                fee: new FormControl(0, Validators.required),
            });
            this.typeUser = this.mainServ.loginServ.getType();
            if (this.typeUser == "consultant") {
                this.clients = [{ "type": this.typeUser, "username": this.mainServ.loginServ.getuserName(), "id": this.mainServ.loginServ.getUserId() }]
                this.regiForm = new FormGroup({
                    textBoxAdmin: new FormControl(this.text),
                    consId: new FormControl(this.clients[0]["id"], Validators.required),
                    fee: new FormControl(0, Validators.required),
                });
            } else {
                this.mainServ.APIServ.get("staffusers/getConsultant").subscribe((data: any) => {
                    if (this.mainServ.APIServ.getErrorCode() == 0) {

                        this.clients = data['getConsultant'];
                        // this.loadingIndicator = false;

                    }
                    else if (this.mainServ.APIServ.getErrorCode() == 400) {

                    }
                    else {
                        this.mainServ.globalServ.somthingError();
                    }

                });
            }
        } else if(this.isContract) {
            this.regiForm = new FormGroup({
                textBoxAdmin: new FormControl(this.text),
                contractId: new FormControl('', Validators.required)
            });
            this.mainServ.APIServ.get("contractypes/getContractsTypes").subscribe((data: any) => {
                if (this.mainServ.APIServ.getErrorCode() == 0) {
                  this.contractTypes = data;
                }
              });
        } else {
            this.regiForm = new FormGroup({
                textBoxAdmin: new FormControl(this.text)
            });
        }
    }
    onYesClick() {
        if (this.isWithID && this.regiForm.value['textBoxAdmin'] == null) {
            this.regiForm.value['textBoxAdmin'] = ""
        }
        this.dialogRef.close(this.regiForm.value);
    }
}
