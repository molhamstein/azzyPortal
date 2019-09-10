import { colors } from './../../calendar/colors';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { SetTextBoxAdminComponent } from './../../dialogs/set-text-box-admin/set-text-box-admin.component';
import { MatDialog } from '@angular/material';
import { MainService } from './../../../../core/services/main.service';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.scss']
})
export class addUserComponent implements OnInit {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 5;
  addUserForm;
  types;

  hide = true;
  private primaryColor: string = "#127bdc";
  private secondryColor: string = "#127bdc";
  constructor(
    private mainServ: MainService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService,
  ) {
    this.translationLoader.loadTranslations(english, persian);
  }


  ngOnInit() {
    this.addUserForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      type: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.types = [
      {
        "value": 'consultant',
        "viewValue": 'User.ADDEDITUSER.CONSULTANT'
      },
      {
        "value": 'manager',
        "viewValue": 'User.ADDEDITUSER.MANAGER'
      },
      {
        "value": 'secretary',
        "viewValue": 'User.ADDEDITUSER.SECRETARY'
      },
      {
        "value": 'reception',
        "viewValue": 'User.ADDEDITUSER.RECEPTION'
      },
      {
        "value": 'adminstrator',
        "viewValue": 'User.ADDEDITUSER.ADMINSTRATOR'
      }
    ]
  }


  add() {
    var data = this.addUserForm.value;
    if (data['type'] == 'consultant') {
      data['primarycolor'] = this.primaryColor;
      data['secondarycolor'] = this.secondryColor;
    }
    this.mainServ.APIServ.post("staffusers", data).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.globalServ.goTo('users')
      }
    })
  }

  // changeStatus(newStatus, id, name, text) {
  //   const dialogRef = this.dialog.open(SetTextBoxAdminComponent, {
  //     width: '500px',
  //     data: { textBoxMessage: text }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.mainServ.globalServ.confirmationMessage('are you sure you want change ' + name + '\'s form to ' + newStatus, "forms/" + id, { 'status': newStatus,'textBoxAdmin': result})
  //     }
  //   });
  // }

  // openDialog(status, id,name) {
  //     this.mainServ.globalServ.confirmationMessage('are you sure you want change '+name+'\'s form to '+status,"forms/" +id,{'status':status})
  //   }
}
