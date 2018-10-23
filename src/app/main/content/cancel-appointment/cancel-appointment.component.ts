import { DialogServiceService } from './../../../core/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../core/services/main.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { FuseConfigService } from '../../../core/services/config.service';

import { locale as english } from '../languageFiles/en';
import { locale as persian } from '../languageFiles/fa';

import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppDirectionService } from '../../../app-direction.service';


@Component({
  selector: 'app-cancel-appointment',
  templateUrl: './cancel-appointment.component.html',
  styleUrls: ['./cancel-appointment.component.scss']
})
export class cancelAppointmentComponent implements OnInit {



  constructor(
    private translate: TranslateService,
    private appDirection: AppDirectionService,
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogSer: DialogServiceService,
    private mainServ: MainService) {
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });
  }

  token
  id
  ngOnInit() {
    window.open('', '_self').close()
    this.translate.use('en');

    this.appDirection.switchDir('ltr');
    // this.mainServ.loaderSer.display(true);
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');
  }

  isCanseld = false;

  cansel() {
    var mainThis = this;


    this.dialogSer.confirmationMessage('are you sure you want delete your appointment', "forms/cancelAp/" + this.id, {}, false, function () {
      // mainThis.mainServ.globalServ.goTo(this.mainServ.getBackUrl())
      // mainThis.mainServ.globalServ.goTo(mainThis.mainServ.getBackUrl())
      mainThis.isCanseld = true;

    }, 'patch')


  }
}
