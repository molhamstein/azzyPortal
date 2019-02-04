import { LoaderServicesService } from './../../../../core/services/loader-services.service';
import { FuseConfigService } from './../../../../core/services/config.service';
import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-unprocessed-forms',
  templateUrl: './unprocessed-forms.component.html',
  styleUrls: ['./unprocessed-forms.component.scss']
})
export class UnprocessedFormsComponent implements OnInit {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 5;

  isSearchMode = false;
  constructor(
    private translationLoader: FuseTranslationLoaderService,
    private translateService: TranslateService,
    private mainServ: MainService,
    private dialogSer: DialogServiceService,
    private fuseConfig: FuseConfigService,
    public dialog: MatDialog) {
    this.translationLoader.loadTranslations(english, persian);
    this.fuseConfig.setSettings({});

  }



  setPage(offset, limit) {
    this.mainServ.loaderSer.display(true);
    var filter;
    if (this.isSearchMode == false)
      filter = {
        "where": { "status": "unprocessed" },
        "order": "dateOfArr DESC",
        "limit": limit,
        "skip": offset * limit
      }
    else
      filter =
        {
          "where": { "or": [{ "nameEnglish": { "like": this.searchKey } }, { "nameFarsi": { "like": this.searchKey } }, { "surnameEnglish": { "like": this.searchKey } }, { "surnameFarsi": { "like": this.searchKey } },] },
          "order": "dateOfArr DESC",
          "limit": limit,
          "skip": offset * limit
        }

    // this.mainServ.APIServ.get("ADs?filter[limit]=" + limit + "&filter[skip]=" + offset * limit).subscribe((data: any) => {
    this.mainServ.APIServ.get("forms?filter=" + JSON.stringify(filter)).subscribe((data: any) => {
      this.mainServ.loaderSer.display(false);

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

  searchKey = "";
  search() {
    this.isSearchMode = true;
    this.inisilaize()
  }

  clear() {
    this.isSearchMode = false;
    this.searchKey=""
    this.inisilaize()

  }

  onPage(event) {
    console.log('Page Event', event);
    this.offset = event.offset;
    this.limit = event.limit;
    this.setPage(this.offset, this.limit);
  }

  inisilaize() {
    this.count = 0;
    this.offset = 0;
    var where
    if (this.isSearchMode == false)
      where = { "status": "unprocessed" }
    else
      where = { "or": [{ "nameEnglish": { "like": this.searchKey } }, { "nameFarsi": { "like": this.searchKey } }, { "surnameEnglish": { "like": this.searchKey } }, { "surnameFarsi": { "like": this.searchKey } },] }

    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.get("forms/count?where=" + JSON.stringify(where)).subscribe((data: any) => {
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
    this.inisilaize()
  }


  goTo(pageName, id) {
    let url = ""
    if (pageName == 'view') {
      url = 'show-form/' + id
    } else if (pageName == 'edit') {
      url = 'edit-form/' + id

    }
    this.mainServ.setBackUrl('unprocessed');
    this.mainServ.globalServ.goTo(url)
  }

  changeStatus(newStatus, urlIndex, id, name, text) {
    var urlsArray = ['forms/changeStatusToUnproc', 'forms/changeStatusToProc', 'forms/changeStatusToConsultation', 'forms/changeStatusToContracts']
    var mainThis = this;

    var isWithID = newStatus == "consultation" ? true : false;

    const dialogRef = this.dialog.open(SetTextBoxAdminComponent, {
      width: '500px',
      data: { 'textBoxMessage': text, 'isWithID': isWithID }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result['formId'] = id;
        if (urlIndex == 1)
          result['statusName'] = newStatus;
        this.dialogSer.confirmationMessage('Do you want to change ' + name + '\'s form to ' + newStatus, urlsArray[urlIndex], result, false, function () {
          mainThis.inisilaize()

        }, 'put')
      }
    });
  }

  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
