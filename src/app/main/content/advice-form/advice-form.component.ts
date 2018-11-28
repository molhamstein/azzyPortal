import { ConfirmAddFormComponent } from './../dialogs/confirm-add-form/confirm-add-form.component';
import { MatDialog } from '@angular/material';
import { Route, Router } from '@angular/router';
import { DialogServiceService } from './../../../core/services/dialog-service.service';
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
  selector: 'app-advice-form',
  templateUrl: './advice-form.component.html',
  styleUrls: ['./advice-form.component.scss']
})
export class AdviceFormComponent implements OnInit {
  startDate = new Date(1993, 1, 1);
  form: FormGroup;
  formErrors: any;
  formGroup: FormGroup;

  // degreesFormArray: FormArray;
  // degreesSpouseFormArray: any[] = [];
  // worksFormArray: FormArray;
  // worksSpouseFormArray: FormArray;


  fuseSettings: any;
  isNonLinear = false;
  isNonEditable = false;
  // startDate = new Date(1990, 0, 1);
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  minDateSp = new Date(1900, 0, 1);
  maxDateSp = new Date();
  sendArray = {}

  maritalStatusList = [
    {
      viewValue: 'Add_Edit_Form.STEP_0.MARRIED',
      value: 'married'
    },
    // {
    //   viewValue: 'Add_Edit_Form.STEP_0.SEPARETED',
    //   value: 'separated'
    // },
    {
      viewValue: 'Add_Edit_Form.STEP_0.DEVORCED',
      value: 'divorced'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_0.WIDOWED',
      value: 'widowed'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_0.NEVER_MARRIED',
      value: 'single'
    },
  ];
  englishLevels = [
    {
      viewValue: 'Add_Edit_Form.STEP_1.EXCELLENT',
      value: 'Excellent'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_1.GOOD',
      value: 'Good'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_1.MEDIUM',
      value: 'Intermediate'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_1.WEAK',
      value: 'Weak'
    }

  ];
  englishScores = [
    {
      viewValue: 'ًWriting',
      value: ['writingEn', 'writingEnSp'],
      icon: 'edit'
    },
    {
      viewValue: 'Listening',
      value: ['listeningEn', 'listeningEnSp'],
      icon: 'hearing'
    },
    {
      viewValue: 'Reading',
      value: ['readingEn', 'readingEnSp'],
      icon: 'local_library'
    },
    {
      viewValue: 'Speaking',
      value: ['speakingEn', 'speakingEnSp'],
      icon: 'record_voice_over'
    },
    {
      viewValue: 'Overall',
      value: ['overallEn', 'overallEnSp'],
      icon: 'done_all'
    }
  ];

  years = []


  eduLevels = [
    {
      label: "Associate Degree",
      fields: [
        {
          viewValue: 'Add_Edit_Form.STEP_2.FIELD',
          value: ['assocField', 'assocFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.UNIVERSITY',
          value: ['assocUniversity', 'assocUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.YEAR_GRAD',
          value: ['assocYearOfGraduation', 'assocYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.EDU_PLACE',
          value: ['assocCityOfUniversity', 'assocCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "Bachelor Degree",
      fields: [
        {
          viewValue: 'Add_Edit_Form.STEP_2.FIELD',
          value: ['bacField', 'bacFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.UNIVERSITY',
          value: ['bacUniversity', 'bacUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.YEAR_GRAD',
          value: ['bacYearOfGraduation', 'bacYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.EDU_PLACE',
          value: ['bacCityOfUniversity', 'bacCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "Master Degree",
      fields: [
        {
          viewValue: 'Add_Edit_Form.STEP_2.FIELD',
          value: ['masterField', 'masterFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.UNIVERSITY',
          value: ['masterUniversity', 'masterUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.YEAR_GRAD',
          value: ['masterYearOfGraduation', 'masterYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.EDU_PLACE',
          value: ['masterCityOfUniversity', 'masterCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "PHDDegree",
      fields: [
        {
          viewValue: 'Add_Edit_Form.STEP_2.FIELD',
          value: ['PHDField', 'PHDFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.UNIVERSITY',
          value: ['PHDUniversity', 'PHDUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.YEAR_GRAD',
          value: ['PHDYearOfGraduation', 'PHDYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'Add_Edit_Form.STEP_2.EDU_PLACE',
          value: ['PHDCityOfUniversity', 'PHDCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    }
  ];

  workExperience = [
    {
      viewValue: 'Add_Edit_Form.STEP_3.FIELDOfWork',
      value: ['fieldOfWorking', 'fieldOfWorkingSp'],
      icon: 'book',
      isNumber: false,
      fxFlex: 98
    },
    {
      viewValue: 'Add_Edit_Form.STEP_3.REDYPAID',
      value: ['relatedEdYearsPaid', 'relatedEdYearsPaidSp'],
      icon: 'book',
      isNumber: true,
      fxFlex: 24

    },
    {
      viewValue: 'Add_Edit_Form.STEP_3.REDYNPAID',
      value: ['relatedEdYearsNonPaid', 'relatedEdYearsNonPaidSp'],
      icon: 'calendar_today',
      isNumber: true,
      fxFlex: 23
    },
    {
      viewValue: 'Add_Edit_Form.STEP_3.NREDYPAID',
      value: ['nonRelatedEdYearsPaid', 'nonRelatedEdYearsPaidSp'],
      icon: 'book',
      isNumber: true,
      fxFlex: 23
    },
    {
      viewValue: 'Add_Edit_Form.STEP_3.NREDYNPAID',
      value: ['nonRelatedEdYearsNonPaid', 'nonRelatedEdYearsNonPaidSp'],
      icon: 'calendar_today',
      isNumber: true,
      fxFlex: 23
    },
  ]

  militaryStatus = [
    {
      viewValue: 'Add_Edit_Form.STEP_4.FINISHED',
      value: 'Finished'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_4.EXEMPTION',
      value: 'Exemption'
    }
  ]

  militaryFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_4.PLACE',
      value: ['militaryPlace', 'militaryPlaceSp'],
      icon: 'book',
      type: 'input',
      width: 30
    },
    {
      viewValue: 'Add_Edit_Form.STEP_4.FROM',
      value: ['militaryDurationFrom', 'militaryDurationFromSp'],
      icon: 'book',
      type: 'date',
      width: 30
    }, {
      viewValue: 'Add_Edit_Form.STEP_4.TO',
      value: ['militaryDurationTo', 'militaryDurationToSp'],
      icon: 'book',
      type: 'date',
      width: 30
    }, {
      viewValue: 'Add_Edit_Form.STEP_4.EXEMPTIONREASON',
      value: ['exemptionReason', 'exemptionReasonSp'],
      icon: 'book',
      type: 'textarea',
      width: 97
    }
  ]

  visaType = [
    {
      viewValue: 'Add_Edit_Form.STEP_6.CITIZEN',
      value: 'Citizen'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.PERMANENTRES',
      value: 'Permanent Res.'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.TEMPORARYRES',
      value: 'Temporary Res.'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.STUDENTASSYLUM',
      value: 'Student-Assylum'
    },
  ]

  healthFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_5.SIGNIFICANT',
      value: ['significantCurrentSickness', 'significantCurrentSicknessSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.SURGERY',
      value: ['surgeryPastOrFuture', 'surgeryPastOrFutureSp'],
      icon: 'book'
    }
  ]
  australiaFields = [

    {
      viewValue: 'Add_Edit_Form.STEP_6.RELATION',
      value: ['australiaFamilyRelation', 'australiaFamilyRelationSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.LIVINGSTATE',
      value: ['australiaLivingState', 'australiaLivingStateSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.LIVINGCITY',
      value: ['australiaLivingCity', 'australiaLivingCitySp'],
      icon: 'book'
    },

  ]

  // nameFormGroup: FormGroup;
  // emailFormGroup: FormGroup;

  steps = [
    { label: 'Confirm your name', content: 'Last name, First name.' },
    { label: 'Confirm your contact information', content: '123-456-7890' },
    { label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV' },
    { label: 'You are now done', content: 'Finished!' }
  ];

  stepsIndex = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
  };

  setStep(pindex: number, index: number) {
    this.stepsIndex[pindex] = index;
  }

  nextStep(pindex: number) {
    this.stepsIndex[pindex]++;
  }

  prevStep(pindex: number) {
    this.stepsIndex[pindex]--;
  }

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }


  constructor(
    private translate: TranslateService,
    private appDirection: AppDirectionService,
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private dialogSerc: DialogServiceService,
    private dialog: MatDialog,
    private mainServ: MainService) {
    this.fuseSettings = this.fuseConfig.settings;
    this.fuseSettings.optionsBtn = 'none';
    this.fuseSettings.layout.navigation = 'none';
    // this.fuseSettings.layout.toolbar = 'none';
    this.fuseSettings.layout.footer = 'none';


    for (var index = 0; index <= 100; index++) {
      this.years.push(1960 + index);
    }

    this.fuseConfig.setSettings(this.fuseSettings);

    this.translationLoader.loadTranslations(english, persian);

    this.formErrors = {
      company: {},
      firstName: {},
      lastName: {},
      address: {},
      address2: {},
      city: {},
      state: {},
      postalCode: {}
    };

  }

  ngOnInit() {
    this.translate.use('en');

    this.appDirection.switchDir('ltr');

    //   this.form = this.formBuilder.group({
    //     company   : [
    //         {
    //             value   : 'Google',
    //             disabled: true
    //         }, Validators.required
    //     ],
    //     firstName : ['', Validators.required],
    //     lastName  : ['', Validators.required],
    //     address   : ['', Validators.required],
    //     address2  : ['', Validators.required],
    //     city      : ['', Validators.required],
    //     state     : ['', Validators.required],
    //     postalCode: ['', [Validators.required, Validators.maxLength(5)]]
    // });

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nameFarsi: ['', Validators.required],
          surnameFarsi: ['', Validators.required],
          nameEnglish: ['', Validators.required],
          surnameEnglish: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          mobileNo: ['', Validators.required],
          lLandlinePhoneNo: [''],
          maritalStatus: ['', Validators.required],
          numberOfChildren: [''],
          dateOfBirthPer: ['', Validators.required],
          skypeID: [''],
          residentialAddressEnglish: ['', Validators.required],
          residentialAddressFarsi: ['', Validators.required],

          nameFarsiSp: [''],
          surnameFarsiSp: [''],
          nameEnglishSp: [''],
          surnameEnglishSp: [''],
          emailSp: [''],
          mobileNoSp: [''],
          lLandlinePhoneNoSp: [''],
          maritalStatusSp: [''],
          numberOfChildrenSp: [''],
          dateOfBirthPerSp: [''],
          skypeIDSp: [''],
          residentialAddressEnglishSp: [''],
          residentialAddressFarsiSp: ['']
        }),
        this._formBuilder.group({
          goodEnglish: ['', Validators.required],
          writingEn: [''],
          listeningEn: [''],
          readingEn: [''],
          speakingEn: [''],
          overallEn: [''],
          goodEnglishSp: [''],
          writingEnSp: [''],
          listeningEnSp: [''],
          readingEnSp: [''],
          speakingEnSp: [''],
          overallEnSp: [''],
        }),
        this._formBuilder.group({
          assocField: [''],
          assocUniversity: [''],
          assocCityOfUniversity: [''],
          assocYearOfGraduation: [''],
          bacField: [''],
          bacUniversity: [''],
          bacCityOfUniversity: [''],
          bacYearOfGraduation: [''],
          masterField: [''],
          masterUniversity: [''],
          masterCityOfUniversity: [''],
          masterYearOfGraduation: [''],
          PHDField: [''],
          PHDUniversity: [''],
          PHDCityOfUniversity: [''],
          PHDYearOfGraduation: [''],
          assocFieldSp: [''],
          assocUniversitySp: [''],
          assocCityOfUniversitySp: [''],
          assocYearOfGraduationSp: [''],
          bacFieldSp: [''],
          bacUniversitySp: [''],
          bacCityOfUniversitySp: [''],
          bacYearOfGraduationSp: [''],
          masterFieldSp: [''],
          masterUniversitySp: [''],
          masterCityOfUniversitySp: [''],
          masterYearOfGraduationSp: [''],
          PHDFieldSp: [''],
          PHDUniversitySp: [''],
          PHDCityOfUniversitySp: [''],
          PHDYearOfGraduationSp: ['']
        }),
        this._formBuilder.group({
          fieldOfWorking: [''],
          relatedEdYearsPaid: [''],
          relatedEdYearsNonPaid: [''],
          nonRelatedEdYearsPaid: [''],
          nonRelatedEdYearsNonPaid: [''],
          fieldOfWorkingSp: [''],
          relatedEdYearsPaidSp: [''],
          relatedEdYearsNonPaidSp: [''],
          nonRelatedEdYearsPaidSp: [''],
          nonRelatedEdYearsNonPaidSp: [''],

        }),
        this._formBuilder.group({
          militaryStatus: [''],
          militaryPlace: [''],
          militaryDurationFrom: [''],
          militaryDurationTo: [''],
          exemptionReason: [''],
          militaryStatusSp: [''],
          militaryPlaceSp: [''],
          militaryDurationFromSp: [''],
          militaryDurationToSp: [''],
          exemptionReasonSp: [''],

        }),
        this._formBuilder.group({
          significantCurrentSickness: [''],
          surgeryPastOrFuture: [''],
          significantCurrentSicknessSp: [''],
          surgeryPastOrFutureSp: [''],
        }),
        this._formBuilder.group({
          australiaFamilyRelation: [''],
          australiaLivingState: [''],
          australiaLivingCity: [''],
          australiaVisaType: [''],
          australiaFamilyRelationSp: [''],
          australiaLivingStateSp: [''],
          australiaLivingCitySp: [''],
          australiaVisaTypeSp: [''],
        }),
        this._formBuilder.group({
          textBoxClient: [''],
          howKnow: [''],

        })
      ])
    });

    // this.degreesFormArray = this.formArray.get([2, 'degrees']) as FormArray;
    // this.degreesSpouseFormArray = this.formArray.get([2, 'degreesSpouse']) as FormArray;
    // this.worksFormArray = this.formArray.get([3, 'works']);
    // this.worksSpouseFormArray = this.formArray.get([3, 'worksSpouse']);


    // this.addDegree();
    // this.addWork();
    // this.addForm(true)
    console.log(this.formGroup, this.formArray);

  }

  createDegree(): FormGroup {
    return this._formBuilder.group({
      eduLevel: ['', Validators.required],
      field: ['', Validators.required],
      university: ['', Validators.required],
      eduPlace: ['', Validators.required],
      yearOfGrad: ['', Validators.required],
    });
  }
  createWork(): FormGroup {
    return this._formBuilder.group({
      ralatedStudy: ['', Validators.required],
      fieldActivity: ['', Validators.required],
      insurance: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  addDegree(): void {
    (this.formArray.get([2, 'degrees']) as FormArray).push(this.createDegree());
  }
  addSpouseDegree(): void {
    (this.formArray.get([2, 'degreesSpouse']) as FormArray).push(this.createDegree());
  }
  addWork(): void {
    (this.formArray.get([3, 'works']) as FormArray).push(this.createWork());
  }
  addSpouseWork(): void {
    (this.formArray.get([3, 'worksSpouse']) as FormArray).push(this.createWork());
  }
  removeDegree(index: number): void {
    (this.formArray.get([2, 'degrees']) as FormArray).removeAt(index);
  }
  removeSpouseDegree(index: number): void {
    (this.formArray.get([2, 'degreesSpouse']) as FormArray).removeAt(index);
  }
  removeWork(index: number): void {
    (this.formArray.get([3, 'works']) as FormArray).removeAt(index);
  }
  removeSpouseWork(index: number): void {
    (this.formArray.get([3, 'worksSpouse']) as FormArray).removeAt(index);
  }

  addForm(isStatic: boolean = false) {
    this.sendArray = {}
    var customArray = {};
    var key;
    if (isStatic) {
      customArray = { "formArray": [{ "nameFarsi": "anas", "surnameFarsi": "alazmeh", "nameEnglish": "anas", "surnameEnglish": "alazmeh", "email": "world.of.anas.955@gmail.com", "mobileNo": "11111", "lLandlinePhoneNo": "3213213123", "maritalStatus": "married", "numberOfChildren": 0, "dateOfBirthPer": "1995-06-24T21:00:00.000Z", "dateOfBirthGre": "1995-06-24T21:00:00.000Z", "skypeID": "313113113", "residentialAddressEnglish": "Damas", "residentialAddressFarsi": "damas", "nameFarsiSp": "test", "surnameFarsiSp": "test2", "nameEnglishSp": "test", "surnameEnglishSp": "Test2", "emailSp": "a3@a.com", "mobileNoSp": "555", "lLandlinePhoneNoSp": "3211312", "maritalStatusSp": "married", "numberOfChildrenSp": 0, "dateOfBirthPerSp": "1993-11-10T22:00:00.000Z", "dateOfBirthGreSp": "1993-11-10T22:00:00.000Z", "skypeIDSp": "22131", "residentialAddressEnglishSp": "Damas", "residentialAddressFarsiSp": "damas" }, { "goodEnglish": "Excellent", "writingEn": 10, "listeningEn": 20, "readingEn": 30, "speakingEn": 40, "overallEn": 50, "goodEnglishSp": "Good", "writingEnSp": 50, "listeningEnSp": 40, "readingEnSp": 30, "speakingEnSp": 50, "overallEnSp": 70 }, { "assocField": "assoc", "assocUniversity": "adasd", "assocCityOfUniversity": "asdad", "assocYearOfGraduation": "1993", "bacField": "bac", "bacUniversity": "asdas", "bacCityOfUniversity": "asdasd", "bacYearOfGraduation": "1992", "masterField": "master", "masterUniversity": "asdasd", "masterCityOfUniversity": "qwqeq", "masterYearOfGraduation": "1995", "PHDField": "PHD", "PHDUniversity": "qweqwe", "PHDCityOfUniversity": "qweqe", "PHDYearOfGraduation": "1993", "assocFieldSp": "assocSp", "assocUniversitySp": "zxczc", "assocCityOfUniversitySp": "zxczxc", "assocYearOfGraduationSp": "2000", "bacFieldSp": "bacSp", "bacUniversitySp": "asad", "bacCityOfUniversitySp": "xzczxc", "bacYearOfGraduationSp": "1999", "masterFieldSp": "masterSp", "masterUniversitySp": "qwqwq", "masterCityOfUniversitySp": "wewww", "masterYearOfGraduationSp": "1993", "PHDFieldSp": "PHDSp", "PHDUniversitySp": "dsssssss", "PHDCityOfUniversitySp": "fddddddd", "PHDYearOfGraduationSp": "1993" }, { "fieldOfWorking": "Fieeeeeeeeeeeld", "relatedEdYearsPaid": 20, "relatedEdYearsNonPaid": 30, "nonRelatedEdYearsPaid": 40, "nonRelatedEdYearsNonPaid": 50, "fieldOfWorkingSp": "sadas", "relatedEdYearsPaidSp": 10, "relatedEdYearsNonPaidSp": 20, "nonRelatedEdYearsPaidSp": 30, "nonRelatedEdYearsNonPaidSp": 50 }, { "militaryStatus": "Exemption", "militaryPlace": "dams", "militaryDurationFrom": "1993-01-03T22:00:00.000Z", "militaryDurationTo": "1993-12-17T22:00:00.000Z", "militaryStatusSp": "Finished", "militaryPlaceSp": "Damas", "militaryDurationFromSp": "1993-04-08T21:00:00.000Z", "militaryDurationToSp": "1993-09-18T21:00:00.000Z" }, { "significantCurrentSickness": "qwe", "surgeryPastOrFuture": "asd", "australiaFamilyRelation": "zxc", "australiaLivingState": "qwe1", "australiaLivingCity": "asd2", "australiaVisaType": "Citizen", "significantCurrentSicknessSp": "fghf", "surgeryPastOrFutureSp": "dfdgdg", "australiaFamilyRelationSp": "cvbcb", "australiaLivingStateSp": "sdfs", "australiaLivingCitySp": "cccccc", "australiaVisaTypeSp": "Temporary Res." }] }
    } else {
      customArray = this.formGroup['value']
    }
    customArray['formArray'].forEach(element => {
      for (key in element) {
        if (element[key] != "")
          this.sendArray[key] = element[key];
      }
    });

    // this.dialogSerc.confirmationMessage("are you sure you wan't add the form","forms",this.sendArray,false,)
    let dialogRef = this.dialog.open(ConfirmAddFormComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.mainServ.APIServ.post("forms", this.sendArray).subscribe((data: any) => {
          if (this.mainServ.APIServ.getErrorCode() == 0) {
            this.dialogSerc.responseFormDialog(true, data)
          } else if (this.mainServ.APIServ.getErrorCode() == 422) {
            this.mainServ.APIServ.setErrorCode(0);
            this.dialogSerc.responseFormDialog(false)
          } else {
            alert("somethingError");
            this.mainServ.APIServ.setErrorCode(0);
          }
        })

      }
    });

  }

}
