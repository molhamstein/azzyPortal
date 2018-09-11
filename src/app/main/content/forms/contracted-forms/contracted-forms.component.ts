import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../i18n/en';
import { locale as persian } from '../i18n/fa';
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

  constructor(private translationLoader: FuseTranslationLoaderService
    , private translateService: TranslateService
    , private mainServ: MainService,
    public dialog: MatDialog) {
    this.translationLoader.loadTranslations(english, persian);
  }



  setPage(offset, limit) {

    // this.mainServ.APIServ.get("ADs?filter[limit]=" + limit + "&filter[skip]=" + offset * limit).subscribe((data: any) => {
    this.mainServ.APIServ.get("forms?filter={\"where\":{\"status\":\"contracts\"},\"order\": \"dateOfArr DESC\",\"limit\":" + limit + ",\"skip\":" + offset * limit + "}").subscribe((data: any) => {
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
    this.mainServ.APIServ.get("forms/count?where={\"status\":\"contracts\"}").subscribe((data: any) => {
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


  goTo(pageName, id) {
    let url = ""
    if (pageName == 'view') {
      url = 'show-form/' + id
    } else if (pageName == 'edit') {
      url = 'edit-form/' + id

    }
    this.mainServ.globalServ.goTo(url)
  }

  // changeStatus(newStatus, id, name, text) {
  //   const dialogRef = this.dialog.open(SetTextBoxAdminComponent, {
  //     width: '500px',
  //     data: { textBoxMessage: text }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.mainServ.globalServ.confirmationMessage('are youe sure you want change ' + name + '\'s form to ' + newStatus, "forms/" + id, { 'status': newStatus,'textBoxAdmin': result})
  //     }
  //   });
  // }

  // openDialog(status, id,name) {
  //     this.mainServ.globalServ.confirmationMessage('are youe sure you want change '+name+'\'s form to '+status,"forms/" +id,{'status':status})
  //   }
}
