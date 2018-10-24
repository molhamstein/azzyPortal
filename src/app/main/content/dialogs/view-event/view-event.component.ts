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
    selector: 'view-event',
    templateUrl: 'view-event.component.html',
    styleUrls: ['view-event.component.scss']
})
export class viewEventComponent {


    events
    constructor(
        public dialogRef: MatDialogRef<viewEventComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        // private mainServ: MainService,
        // private _formBuilder: FormBuilder,
        // private translate: TranslateService,
        // private translationLoader: FuseTranslationLoaderService,

    ) {
        // this.translationLoader.loadTranslations(english, persian);
        this.events = data['events'];
        console.log(this.events);
    }
    // myControl = new FormControl();
    // options: string[] = ['One', 'Two', 'Three'];
    // filteredOptions: Observable<string[]>;
    ngOnInit() {
        // this.mainServ.APIServ.get("forms?filter={\"where\":{\"status\":\"consultation\"}}").subscribe((data: any) => {
        //     if (this.mainServ.APIServ.getErrorCode() == 0) {
        //         this.options = data;
        //         this.filteredOptions = this.myControl.valueChanges
        //             .pipe(
        //             startWith(''),
        //             map(value => this._filter(value))
        //             );
        //     }
        //     else if (this.mainServ.APIServ.getErrorCode() == 400) {

        //     }
        //     else {
        //         this.mainServ.globalServ.somthingError();
        //     }

        // });

    }


    close() {
        this.dialogRef.close();
    }
    save() {
    }
}
