import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'add-apointment',
    templateUrl: 'add-apointment.component.html',
    styleUrls: ['add-apointment.component.scss']
})
export class AddApointmentComponent {


    appointment
    constructor(
        public dialogRef: MatDialogRef<AddApointmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.translationLoader.loadTranslations(english, persian);
        this.appointment = data['appointment'];
    }
    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    ngOnInit() {
        var filter = { "where": { "status": "consultation", "or": [{ "appointmentId": " " }, { "appointmentId": null }] } }
        this.mainServ.APIServ.get("forms?filter=" + JSON.stringify(filter)).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                this.options = data;
                this.filteredOptions = this.myControl.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => this._filter(value))
                    );
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });

    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option['nameEnglish'].toLowerCase().includes(filterValue));
    }

    close() {
        this.dialogRef.close();
    }
    save() {
        var user = this.options.filter(option => option['mobileNo'].includes(this.myControl.value))[0];

        this.mainServ.APIServ.put("forms/selectAp/" + user['id'], { 'apId': this.appointment['meta']['id'] }).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {


                this.dialogRef.close();

            }
        })
    }

    delete() {
        this.mainServ.APIServ.delete("consTimes/" + this.appointment.meta.id).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {


                this.dialogRef.close();

            }
        })

    }
}
