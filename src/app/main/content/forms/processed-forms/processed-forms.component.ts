import { MainService } from './../../../../core/services/main.service';
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
  count: number = 0;
  offset: number = 0;
  limit: number = 5;

  constructor(private translationLoader: FuseTranslationLoaderService, private mainServ: MainService, private translateService: TranslateService) {
    this.translationLoader.loadTranslations(english, persian);
  }




  setPage(offset, limit) {

    // this.mainServ.APIServ.get("ADs?filter[limit]=" + limit + "&filter[skip]=" + offset * limit).subscribe((data: any) => {
    this.mainServ.APIServ.get("forms?filter={\"where\":{\"status\":{\"neq\" : \"unprocessed\"}}, \"order\": \"dateOfArr DESC\",\"limit\":" + limit + ",\"skip\":" + offset * limit + "}").subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {

        this.rows = data;
        // this.loadingIndicator = false;

      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });
  }


  onPage(event) {
    console.log('Page Event', event);
    this.offset = event.offset;
    this.limit = event.limit;
    this.setPage(this.offset, this.limit);
  }



  ngOnInit() {
    // ?filter={\"where\":{\"status\":\"unprocessed\"},\"order\": \"dateOfArr ASC\"}
    this.mainServ.APIServ.get("forms/count?where={\"status\":{\"neq\" : \"unprocessed\"}}").subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.count = data['count'];
        this.setPage(this.offset, this.limit);
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        // this.mainServ.globalServ.somthingError();
      }

    });
  }

}
