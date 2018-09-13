import { FuseTranslationLoaderService } from './../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from './../../../../core/services/main.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';

@Component({
    selector: 'add-slotes',
    templateUrl: 'add-slotes.component.html',
    styleUrls: ['add-slotes.component.scss']
})
export class AddSlotesComponent {
    eventForm: FormGroup;
    consultant = [];
    public dateTime: Date;
    picker;
    private exportTime = { hour: 7, minute: 15, format: 24 };
    // startTime;
    x = new Date()
    constructor(
        public dialogRef: MatDialogRef<AddSlotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private mainServ: MainService,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,

    ) {
        this.translationLoader.loadTranslations(english, persian);

    }

    convertTo24(str) {
        str = String(str).toLowerCase().replace(/\s/g, '');
        var has_am = str.indexOf('am') >= 0;
        var has_pm = str.indexOf('pm') >= 0;
        // first strip off the am/pm, leave it either hour or hour:minute
        str = str.replace('am', '').replace('pm', '');
        // if hour, convert to hour:00
        if (str.indexOf(':') < 0) str = str + ':00';
        // now it's hour:minute
        // we add am/pm back if striped out before 
        if (has_am) str += ' am';
        if (has_pm) str += ' pm';
        // now its either hour:minute, or hour:minute am/pm
        // put it in a date object, it will convert to 24 hours format for us 
        var d = new Date("1/1/2011 " + str);
        // make hours and minutes double digits
        var doubleDigits = function (n) {
            return (parseInt(n) < 10) ? "0" + n : String(n);
        };
        return { 'hours': doubleDigits(d.getHours()), 'minutes': doubleDigits(d.getMinutes()) }
    }

    ngOnInit() {
        this.translate.use('en');
        this.eventForm = new FormGroup({
            date: new FormControl('', Validators.required),
            location: new FormControl('', Validators.required),
            consId: new FormControl('', Validators.required)
        });

        this.mainServ.APIServ.get("staffusers?filter={\"where\":{\"type\":\"consultant\"}}").subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {

                this.consultant = data;
                // this.loadingIndicator = false;

            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
        this.convertTo24('4:30pm');
    }

    save(isClose, startPicker, endPicker) {
        let data = this.eventForm.value;

        let startDateString = this.convertTo24(startPicker['userTime']['hour'] + ":" + startPicker['userTime']['minute'] + startPicker['userTime']['meriden'])
        let endPickerString = this.convertTo24(endPicker['userTime']['hour'] + ":" + endPicker['userTime']['minute'] + endPicker['userTime']['meriden'])

        console.log("startDateString")
        console.log(startDateString)

        console.log("endPickerString")
        console.log(endPickerString)

        var month = (data['date'].getMonth() + 1)
        var day = data['date'].getDate()
        var year = data['date'].getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;


        let stringDate = year + "-" + month + "-" + day
        console.log("stringDate")
        console.log(stringDate)
        data['startDate'] = new Date(stringDate);
        data['startDate'].setHours(startDateString['hours']);
        data['startDate'].setMinutes(startDateString['minutes'])

        data['endDate'] = new Date(stringDate);
        data['endDate'].setHours(endPickerString['hours']);
        data['endDate'].setMinutes(endPickerString['minutes'])




        console.log(data);
        this.mainServ.APIServ.post("consTimes", this.eventForm.value).subscribe((data: any) => {
            if (this.mainServ.APIServ.getErrorCode() == 0) {
                if (isClose)
                    this.dialogRef.close();
                else
                    this.eventForm = new FormGroup({
                        date: new FormControl('', Validators.required),
                        location: new FormControl('', Validators.required),
                        consId: new FormControl('', Validators.required)
                    });
            }
            else if (this.mainServ.APIServ.getErrorCode() == 400) {

            }
            else {
                this.mainServ.globalServ.somthingError();
            }

        });
    }

}