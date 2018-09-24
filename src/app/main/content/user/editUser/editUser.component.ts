import { ActivatedRoute } from '@angular/router';
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
  selector: 'app-editUser',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.scss']
})
export class editUserComponent implements OnInit {
  rows = [];
  count: number = 0;
  offset: number = 0;
  limit: number = 5;
  editUserForm;
  types;
  id;
  private primaryColor: string = "#127bdc";
  private secondryColor: string = "#127bdc";
  constructor(
    private mainServ: MainService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private translationLoader: FuseTranslationLoaderService,
  ) {
    this.translationLoader.loadTranslations(english, persian);
  }


  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.editUserForm = new FormGroup({
      email: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.mainServ.APIServ.get("staffusers/" + this.id).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        // this.form = data;
        this.editUserForm = new FormGroup({
          email: new FormControl(data['email'],  [Validators.required, Validators.email]),
          type: new FormControl(data['type'], Validators.required),
          username: new FormControl(data['username'], Validators.required),
          // password: new FormControl('', Validators.required),
        });
        if (data['type'] == 'consultant') {
          this.primaryColor = data['primarycolor'];
          this.secondryColor = data['secondarycolor'];
        }
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        this.mainServ.globalServ.somthingError();
      }
    })


    this.types = [
      {
        "value": 'consultant',
        "viewValue": 'User.ADDEDITUSER.CONSUTANT'
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
        "value": 'adminstrator',
        "viewValue": 'User.ADDEDITUSER.ADMINSTRATOR'
      }
    ]
  }


  edit() {
    var data = this.editUserForm.value;
    if (data['type'] == 'consultant') {
      data['primarycolor'] = this.primaryColor;
      data['secondarycolor'] = this.secondryColor;
    }
    this.mainServ.APIServ.patch("staffusers/" + this.id, data).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.globalServ.goTo('users')
      }
    })
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
