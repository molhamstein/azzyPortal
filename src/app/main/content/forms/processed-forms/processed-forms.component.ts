import { FuseConfigService } from './../../../../core/services/config.service';
import { MatDialog } from '@angular/material';
import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';

import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
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

  constructor(
    private translationLoader: FuseTranslationLoaderService,
    private mainServ: MainService,
    private translateService: TranslateService,
    private dialogSer: DialogServiceService,
    private fuseConfig: FuseConfigService,
    public dialog: MatDialog) {

    this.translationLoader.loadTranslations(english, persian);
    this.fuseConfig.setSettings({});
  }




  setPage(offset, limit) {
    var urlsArray = ['forms/changeStatusToUnproc', 'forms/changeStatusToProc', 'forms/changeStatusToConsultation', 'forms/changeStatusToContracts']
    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.get("forms?filter={\"include\": \"consultant\",\"where\":{\"status\":{\"neq\" : \"unprocessed\"}}, \"order\": \"dateOfArr DESC\",\"limit\":" + limit + ",\"skip\":" + offset * limit + "}").subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.loaderSer.display(false);

        this.rows = data;

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
    this.mainServ.loaderSer.display(true);

    this.offset = event.offset;
    this.limit = event.limit;
    this.setPage(this.offset, this.limit);
  }


  inisilaize() {
    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.get("forms/count?where={\"status\":{\"neq\" : \"unprocessed\"}}").subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.count = data['count'];
        this.mainServ.loaderSer.display(false);

        this.setPage(this.offset, this.limit);
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        // this.mainServ.globalServ.somthingError();
      }

    });
  }

  ngOnInit() {
    this.inisilaize();

  }

  goTo(pageName, id) {
    let url = ""
    if (pageName == 'view') {
      url = 'show-form/' + id
    } else if (pageName == 'edit') {
      url = 'edit-form/' + id

    }
    this.mainServ.setBackUrl('processed');
    this.mainServ.globalServ.goTo(url)
  }

  changeStatus(newStatus, urlIndex, id, name, text) {
    var mainThis = this;
    var isWithID = newStatus == "consultation" ? true : false;
    var urlsArray = ['forms/changeStatusToUnproc', 'forms/changeStatusToProc', 'forms/changeStatusToConsultation', 'forms/changeStatusToContracts']

    const dialogRef = this.dialog.open(SetTextBoxAdminComponent, {
      width: '500px',
      data: { 'textBoxMessage': text, 'isWithID': isWithID }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        result['formId'] = id;
        if (urlIndex == 1)
          result['statusName'] = newStatus;
        this.dialogSer.confirmationMessage('are you sure you want change ' + name + '\'s form to ' + newStatus, urlsArray[urlIndex], result, false, function () {
          mainThis.inisilaize()
        }, 'put')
      }
    });
  }


  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
