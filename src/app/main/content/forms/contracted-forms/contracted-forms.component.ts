import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { FuseConfigService } from './../../../../core/services/config.service';
import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-contracted-forms',
  templateUrl: './contracted-forms.component.html',
  styleUrls: ['./contracted-forms.component.scss']
})
export class ContractedFormsComponent implements OnInit {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 5;

  isSearchMode = false;

  constructor(private translationLoader: FuseTranslationLoaderService
    , private translateService: TranslateService
    , private mainServ: MainService,
    private fuseConfig: FuseConfigService,
    private dialogSer: DialogServiceService,
    public dialog: MatDialog) {
    this.translationLoader.loadTranslations(english, persian);
    this.fuseConfig.setSettings({});

  }


  export() {
    var filter = {};
    if (this.isSearchMode == false)
      filter = {
        "where": { "status": "contracts" },
        "order": "dateOfArr DESC"
      }
    else
      filter =
        {
          "where": { "or": [{ "nameEnglish": { "like": this.searchKey } }, { "nameFarsi": { "like": this.searchKey } }, { "surnameEnglish": { "like": this.searchKey } }, { "surnameFarsi": { "like": this.searchKey } },] },
          "order": "dateOfArr DESC",
        }

    this.mainServ.APIServ.get("forms/exportForms?filter=" + JSON.stringify(filter)).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        var win = window.open(data.path, '_blank');
        win.focus();

      }
    })
  }


  setPage(offset, limit) {
    var urlsArray = ['forms/changeStatusToUnproc', 'forms/changeStatusToProc', 'forms/changeStatusToConsultation', 'forms/changeStatusToContracts']
    this.mainServ.loaderSer.display(true);

    var filter;
    if (this.isSearchMode == false)
      filter = {
        "where": { "status": "contracts" },
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
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.loaderSer.display(false);

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
    this.searchKey = ""
    this.inisilaize()

  }


  onPage(event) {
    console.log('Page Event', event);
    this.offset = event.offset;
    this.limit = event.limit;
    this.setPage(this.offset, this.limit);
  }

  inisilaize() {
    this.mainServ.loaderSer.display(true);

    this.count = 0;
    this.offset = 0;
    var where
    if (this.isSearchMode == false)
      where = { "status": "contracts" }
    else
      where = { "or": [{ "nameEnglish": { "like": this.searchKey } }, { "nameFarsi": { "like": this.searchKey } }, { "surnameEnglish": { "like": this.searchKey } }, { "surnameFarsi": { "like": this.searchKey } },] }

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
    this.inisilaize();
  }

  goTo(pageName, id) {
    let url = ""
    if (pageName == 'view') {
      url = 'show-form/' + id
    } else if (pageName == 'edit') {
      url = 'edit-form/' + id

    }
    this.mainServ.setBackUrl('contracted');
    this.mainServ.globalServ.goTo(url)
  }

  changeStatus(newStatus, urlIndex, id, name, text) {
    var mainThis = this;
    var urlsArray = ['forms/changeStatusToUnproc', 'forms/changeStatusToProc', 'forms/changeStatusToConsultation', 'forms/changeStatusToContracts']
    if (urlIndex != 0) {

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
    else {
      var result = {};
      result['formId'] = id
      this.dialogSer.confirmationMessage('Do you want to change ' + name + '\'s form to ' + newStatus, urlsArray[urlIndex], result, false, function () {
        mainThis.inisilaize()

      }, 'put')
    }
  }



  downloadCont(id) {
    this.mainServ.APIServ.get("forms/getContractPdf/" + id).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        console.log(data['getContractPdf'].url);
        var win = window.open(data['getContractPdf'].url, '_blank');
        win.focus();
      }
    })

  }


  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
