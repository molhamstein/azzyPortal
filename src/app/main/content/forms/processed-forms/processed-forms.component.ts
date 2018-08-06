import { Component, OnInit } from '@angular/core';

import { locale as english } from '../i18n/en';
import { locale as persian } from '../i18n/fa';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-processed-forms',
  templateUrl: './processed-forms.component.html',
  styleUrls: ['./processed-forms.component.scss']
})
export class ProcessedFormsComponent implements OnInit {
  rows = [];
  constructor(private translationLoader: FuseTranslationLoaderService, private translateService: TranslateService) {
    this.translationLoader.loadTranslations(english, persian);
  }
  ngOnInit() {
    this.rows = [
      {
        Id: '12',
        ArrivalDate: '1232',
        ClientNumber: '154',
        ClientName: 'dsad sd sa',
        Consultant:'Johnny',
        ProcessDate:'dsa',
        Status: 'Processed'

      },
      {
        Id: '12',
        ArrivalDate: '1232',
        ClientNumber: '154',
        ClientName: 'dsad sd sa',
        Consultant:'Johnny',
        ProcessDate:'dsa',
        Status: 'Processed'

      }

    ]
  }

}
