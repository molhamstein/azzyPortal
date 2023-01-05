import { ResetPasswordComponent } from './../../dialogs/reset-password/reset-password.component';
import { DialogServiceService } from './../../../../core/services/dialog-service.service';
import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';

// import * as moment from 'moment'; // add this 1 of 4

// import 'moment-timezone';

// var moment = require('moment-timezone');
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-contract-type',
  templateUrl: './contract-type.component.html',
  styleUrls: ['./contract-type.component.scss']
})
export class ContractTypeComponent implements OnInit {
  rows = [];

  constructor(private translationLoader: FuseTranslationLoaderService
    , private translateService: TranslateService
    , private mainServ: MainService,
    private dialogServ: DialogServiceService,
    public dialog: MatDialog) {
    this.translationLoader.loadTranslations(english, persian);
  }

  inisilaize() {
    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.get("contractypes/getContractsTypes").subscribe((data: any) => {
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

  
  downloadCont(id) {
    this.mainServ.APIServ.get("templates/getContractPdf/" + id).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        var win = window.open(data.url, '_blank');
        win.focus();
      }
    })
  }

  ngOnInit() {
    this.inisilaize();
  }

  goTo(pageName, id) {
    let url = ""
    if (pageName == 'view') {
      url = 'show-form/' + id
    } else if (pageName == 'edit') {
      url = 'edit-contract-type/' + id

    }
    this.mainServ.globalServ.goTo(url)
  }

  addUser() {
    this.mainServ.globalServ.goTo("add-contract-type")
  }


  removeContractType(id, name) {
    var mainThis = this;
    this.dialogServ.confirmationMessage('Do you want to delete ' + name, "contractypes/" + id, { }, false, function () {
      mainThis.inisilaize()
    }, "delete")
  }

  

  isAllowed(role) {
    return this.mainServ.globalServ.isAllowed(role);

  }
}
