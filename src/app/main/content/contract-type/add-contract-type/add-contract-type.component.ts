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
import { LoginService } from '../../../../core/services/login.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-add-contract-type',
  templateUrl: './add-contract-type.component.html',
  styleUrls: ['./add-contract-type.component.scss']
})
export class AddContractTypeComponent implements OnInit {
  addContractTypeForm;
  fileInputName:any;
  hide = true;

  constructor(
    private mainServ: MainService,
    private _formBuilder: FormBuilder,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService,
  ) {
    this.translationLoader.loadTranslations(english, persian);
  }


  ngOnInit() {
    this.addContractTypeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      templateId: new FormControl('', Validators.required),
    });
  }


  add() {
    var data = this.addContractTypeForm.value;
    this.mainServ.APIServ.post("contractypes", data).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.mainServ.globalServ.goTo('contract-type')
      }
    })
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
    if(inputNode.files && inputNode.files[0]) {
      let filesLength = inputNode.files.length;
      if(filesLength > 1) {
        this.mainServ.globalServ.somthingError();
      } else if(filesLength === 1) {
        let reader = new FileReader();
        reader.onload = (event: any) => {
          this.fileInputName = inputNode.files[0].name;
        }
        reader.readAsDataURL(inputNode.files[0]);
        const formData = new FormData();
        formData.append('file', inputNode.files[0]);
        this.mainServ.APIServ.fileUpload("templates/upload", formData).subscribe((data: any) => {
          if (this.mainServ.APIServ.getErrorCode() == 0) {
            this.addContractTypeForm.controls['templateId'].setValue(data.id);
          }
        })
      }
    }
  }

}
