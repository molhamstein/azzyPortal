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
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class usersComponent implements OnInit {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 10;

  constructor(private translationLoader: FuseTranslationLoaderService
    , private translateService: TranslateService
    , private mainServ: MainService,
    private dialogServ: DialogServiceService,
    public dialog: MatDialog) {
    this.translationLoader.loadTranslations(english, persian);
  }



  setPage(offset, limit) {
    this.mainServ.loaderSer.display(true);

    // this.mainServ.APIServ.get("ADs?filter[limit]=" + limit + "&filter[skip]=" + offset * limit).subscribe((data: any) => {
    this.mainServ.APIServ.get("staffusers?filter={\"order\": \"dateOfArr DESC\",\"limit\":" + limit + ",\"skip\":" + offset * limit + "}").subscribe((data: any) => {
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


  onPage(event) {
    console.log('Page Event', event);
    this.offset = event.offset;
    this.limit = event.limit;
    this.setPage(this.offset, this.limit);
  }


  inisilaize() {
    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.get("staffusers/count").subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.loaderSer.display(true);
        this.count = data['count'];
        this.setPage(this.offset, this.limit);
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
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
      url = 'editUser/' + id

    }
    this.mainServ.globalServ.goTo(url)
  }

  addUser() {
    this.mainServ.globalServ.goTo("addUser")
  }

  changeStatus(newStatus, id, name) {
    var mainThis = this;
    this.dialogServ.confirmationMessage('Do you want to change ' + name + ' user to ' + newStatus, "staffusers/" + id, { 'status': newStatus }, false, function () {
      mainThis.inisilaize()
    })

  }

  editPassword(userId) {
    var self = this
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '500px',
      data: { 'userId': userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        self.dialogServ.successDialog()
      }
    });
  }

}
