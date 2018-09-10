import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../core/services/main.service';
import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { FuseConfigService } from '../../../core/services/config.service';

import { locale as english } from './i18n/en';
import { locale as persian } from './i18n/fa';

import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppDirectionService } from '../../../app-direction.service';


@Component({
  selector: 'app-editClient-form',
  templateUrl: './editClient-form.component.html',
  styleUrls: ['./editClient-form.component.scss']
})
export class EditClientFormComponent implements OnInit {
  startDate = new Date(1993, 1, 1);
  form: FormGroup;
  formData: {};
  formErrors: any;
  formGroup: FormGroup;

  fuseSettings: any;
  isNonLinear = false;
  isNonEditable = false;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  minDateSp = new Date(1900, 0, 1);
  maxDateSp = new Date();

  sendArray = {}
  loder = false;
  id :string;
  token:string;
  maritalStatusList = [
    {
      viewValue: 'ADVICE_FORM.STEP_0.MARRIED',
      value: 'married'
    },
    // {
    //   viewValue: 'ADVICE_FORM.STEP_0.SEPARETED',
    //   value: 'separated'
    // },
    {
      viewValue: 'ADVICE_FORM.STEP_0.DEVORCED',
      value: 'divorced'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_0.WIDOWED',
      value: 'widowed'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_0.NEVER_MARRIED',
      value: 'single'
    },
  ];
  englishLevels = [
    {
      viewValue: 'ADVICE_FORM.STEP_1.EXCELLENT',
      value: 'Excellent'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_1.GOOD',
      value: 'Good'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_1.MEDIUM',
      value: 'Intermediate'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_1.WEAK',
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
      label: "assoc",
      fields: [
        {
          viewValue: 'ADVICE_FORM.STEP_2.FIELD',
          value: ['assocField', 'assocFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.UNIVERSITY',
          value: ['assocUniversity', 'assocUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.YEAR_GRAD',
          value: ['assocYearOfGraduation', 'assocYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.EDU_PLACE',
          value: ['assocCityOfUniversity', 'assocCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "bac",
      fields: [
        {
          viewValue: 'ADVICE_FORM.STEP_2.FIELD',
          value: ['bacField', 'bacFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.UNIVERSITY',
          value: ['bacUniversity', 'bacUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.YEAR_GRAD',
          value: ['bacYearOfGraduation', 'bacYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.EDU_PLACE',
          value: ['bacCityOfUniversity', 'bacCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "master",
      fields: [
        {
          viewValue: 'ADVICE_FORM.STEP_2.FIELD',
          value: ['masterField', 'masterFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.UNIVERSITY',
          value: ['masterUniversity', 'masterUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.YEAR_GRAD',
          value: ['masterYearOfGraduation', 'masterYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.EDU_PLACE',
          value: ['masterCityOfUniversity', 'masterCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    },
    {
      label: "PHD",
      fields: [
        {
          viewValue: 'ADVICE_FORM.STEP_2.FIELD',
          value: ['PHDField', 'PHDFieldSp'],
          icon: 'book',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.UNIVERSITY',
          value: ['PHDUniversity', 'PHDUniversitySp'],
          icon: 'location_city',
          isInput: true
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.YEAR_GRAD',
          value: ['PHDYearOfGraduation', 'PHDYearOfGraduationSp'],
          isInput: false
        },
        {
          viewValue: 'ADVICE_FORM.STEP_2.EDU_PLACE',
          value: ['PHDCityOfUniversity', 'PHDCityOfUniversitySp'],
          icon: 'place',
          isInput: true
        }
      ]
    }
  ];

  workExperience = [
    {
      viewValue: 'ADVICE_FORM.STEP_3.FIELDOfWork',
      value: ['fieldOfWorking', 'fieldOfWorkingSp'],
      icon: 'book',
      isNumber: false,
      fxFlex: 90
    },
    {
      viewValue: 'ADVICE_FORM.STEP_3.REDYPAID',
      value: ['relatedEdYearsPaid', 'relatedEdYearsPaidSp'],
      icon: 'book',
      isNumber: true,
      fxFlex: 23

    },
    {
      viewValue: 'ADVICE_FORM.STEP_3.REDYNPAID',
      value: ['relatedEdYearsNonPaid', 'relatedEdYearsNonPaidSp'],
      icon: 'calendar_today',
      isNumber: true,
      fxFlex: 23
    },
    {
      viewValue: 'ADVICE_FORM.STEP_3.NREDYPAID',
      value: ['nonRelatedEdYearsPaid', 'nonRelatedEdYearsPaidSp'],
      icon: 'book',
      isNumber: true,
      fxFlex: 23
    },
    {
      viewValue: 'ADVICE_FORM.STEP_3.NREDYNPAID',
      value: ['nonRelatedEdYearsNonPaid', 'nonRelatedEdYearsNonPaidSp'],
      icon: 'calendar_today',
      isNumber: true,
      fxFlex: 23
    },
  ]

  militaryStatus = [
    {
      viewValue: 'ADVICE_FORM.STEP_4.FINISHED',
      value: 'Finished'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_4.EXEMPTION',
      value: 'Exemption'
    }
  ]

  militaryFields = [
    {
      viewValue: 'ADVICE_FORM.STEP_4.PLACE',
      value: ['militaryPlace', 'militaryPlaceSp'],
      icon: 'book',
      isInput: true
    },
    {
      viewValue: 'ADVICE_FORM.STEP_4.FROM',
      value: ['militaryDurationFrom', 'militaryDurationFromSp'],
      icon: 'book',
      isInput: false
    }, {
      viewValue: 'ADVICE_FORM.STEP_4.TO',
      value: ['militaryDurationTo', 'militaryDurationToSp'],
      icon: 'book',
      isInput: false
    }
  ]

  visaType = [
    {
      viewValue: 'ADVICE_FORM.STEP_5.CITIZEN',
      value: 'Citizen'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.PERMANENTRES',
      value: 'Permanent Res.'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.TEMPORARYRES',
      value: 'Temporary Res.'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.STUDENTASSYLUM',
      value: 'Student-Assylum'
    },
  ]

  australiaFields = [
    {
      viewValue: 'ADVICE_FORM.STEP_5.SIGNIFICANT',
      value: ['significantCurrentSickness', 'significantCurrentSicknessSp'],
      icon: 'book'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.SURGERY',
      value: ['surgeryPastOrFuture', 'surgeryPastOrFutureSp'],
      icon: 'book'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.RELATION',
      value: ['australiaFamilyRelation', 'australiaFamilyRelationSp'],
      icon: 'book'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.LIVINGSTATE',
      value: ['australiaLivingState', 'australiaLivingStateSp'],
      icon: 'book'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_5.LIVINGCITY',
      value: ['australiaLivingCity', 'australiaLivingCitySp'],
      icon: 'book'
    },

  ]


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
    private route: ActivatedRoute,
    private mainServ: MainService) {
    this.fuseSettings = this.fuseConfig.settings;
    this.fuseSettings.optionsBtn = 'none';
    this.fuseSettings.layout.navigation = 'none';
    this.fuseSettings.layout.toolbar = 'none';
    this.fuseSettings.layout.footer = 'none';

    for (var index = 0; index <= 100; index++) {
      this.years.push(1960 + index);
    }
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'none',
        footer: 'none'
      }
    });

    // this.fuseConfig.setSettings(this.fuseSettings);

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


  setFormGroupe(data) {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          nameFarsi: [data['nameFarsi'], Validators.required],
          surnameFarsi: [data['surnameFarsi'], Validators.required],
          nameEnglish: [data['nameEnglish'], Validators.required],
          surnameEnglish: [data['surnameEnglish'], Validators.required],
          email: [data['email'], [Validators.required, Validators.email]],
          mobileNo: [data['mobileNo'], Validators.required],
          lLandlinePhoneNo: [data['lLandlinePhoneNo']],
          maritalStatus: [data['maritalStatus'], Validators.required],
          numberOfChildren: [data['numberOfChildren']],
          dateOfBirthPer: [data['dateOfBirthPer'], Validators.required],
          skypeID: [data['skypeID']],
          residentialAddressEnglish: [data['residentialAddressEnglish'], Validators.required],
          residentialAddressFarsi: [data['residentialAddressFarsi'], Validators.required],

          nameFarsiSp: [data['nameFarsiSp'], Validators.required],
          surnameFarsiSp: [data['surnameFarsiSp'], Validators.required],
          nameEnglishSp: [data['nameEnglishSp'], Validators.required],
          surnameEnglishSp: [data['surnameEnglishSp'], Validators.required],
          emailSp: [data['emailSp'], [Validators.required, Validators.email]],
          mobileNoSp: [data['mobileNoSp'], Validators.required],
          lLandlinePhoneNoSp: [data['lLandlinePhoneNoSp']],
          maritalStatusSp: [data['maritalStatusSp'], Validators.required],
          numberOfChildrenSp: [data['numberOfChildrenSp']],
          dateOfBirthPerSp: [data['dateOfBirthPerSp'], Validators.required],
          skypeIDSp: [data['skypeIDSp']],
          residentialAddressEnglishSp: [data['residentialAddressEnglishSp'], Validators.required],
          residentialAddressFarsiSp: [data['residentialAddressFarsiSp'], Validators.required]
        }),
        this._formBuilder.group({
          goodEnglish: [data['goodEnglish'], Validators.required],
          writingEn: [data['writingEn']],
          listeningEn: [data['listeningEn']],
          readingEn: [data['readingEn']],
          speakingEn: [data['speakingEn']],
          overallEn: [data['overallEn']],
          goodEnglishSp: [data['goodEnglishSp'], Validators.required],
          writingEnSp: [data['writingEnSp']],
          listeningEnSp: [data['listeningEnSp']],
          readingEnSp: [data['readingEnSp']],
          speakingEnSp: [data['speakingEnSp']],
          overallEnSp: [data['overallEnSp']],
        }),
        this._formBuilder.group({
          assocField: [data['assocField']],
          assocUniversity: [data['assocUniversity']],
          assocCityOfUniversity: [data['assocCityOfUniversity']],
          assocYearOfGraduation: [data['assocYearOfGraduation']],
          bacField: [data['bacField']],
          bacUniversity: [data['bacUniversity']],
          bacCityOfUniversity: [data['bacCityOfUniversity']],
          bacYearOfGraduation: [data['bacYearOfGraduation']],
          masterField: [data['masterField']],
          masterUniversity: [data['masterUniversity']],
          masterCityOfUniversity: [data['masterCityOfUniversity']],
          masterYearOfGraduation: [data['masterYearOfGraduation']],
          PHDField: [data['PHDField']],
          PHDUniversity: [data['PHDUniversity']],
          PHDCityOfUniversity: [data['PHDCityOfUniversity']],
          PHDYearOfGraduation: [data['PHDYearOfGraduation']],
          assocFieldSp: [data['assocFieldSp']],
          assocUniversitySp: [data['assocUniversitySp']],
          assocCityOfUniversitySp: [data['assocCityOfUniversitySp']],
          assocYearOfGraduationSp: [data['assocYearOfGraduationSp']],
          bacFieldSp: [data['bacFieldSp']],
          bacUniversitySp: [data['bacUniversitySp']],
          bacCityOfUniversitySp: [data['bacCityOfUniversitySp']],
          bacYearOfGraduationSp: [data['bacYearOfGraduationSp']],
          masterFieldSp: [data['masterFieldSp']],
          masterUniversitySp: [data['masterUniversitySp']],
          masterCityOfUniversitySp: [data['masterCityOfUniversitySp']],
          masterYearOfGraduationSp: [data['masterYearOfGraduationSp']],
          PHDFieldSp: [data['PHDFieldSp']],
          PHDUniversitySp: [data['PHDUniversitySp']],
          PHDCityOfUniversitySp: [data['PHDCityOfUniversitySp']],
          PHDYearOfGraduationSp: [data['PHDYearOfGraduationSp']]
        }),
        this._formBuilder.group({
          fieldOfWorking: [data['fieldOfWorking']],
          relatedEdYearsPaid: [data['relatedEdYearsPaid']],
          relatedEdYearsNonPaid: [data['relatedEdYearsNonPaid']],
          nonRelatedEdYearsPaid: [data['nonRelatedEdYearsPaid']],
          nonRelatedEdYearsNonPaid: [data['nonRelatedEdYearsNonPaid']],
          fieldOfWorkingSp: [data['fieldOfWorkingSp']],
          relatedEdYearsPaidSp: [data['relatedEdYearsPaidSp']],
          relatedEdYearsNonPaidSp: [data['relatedEdYearsNonPaidSp']],
          nonRelatedEdYearsPaidSp: [data['nonRelatedEdYearsPaidSp']],
          nonRelatedEdYearsNonPaidSp: [data['nonRelatedEdYearsNonPaidSp']],

        }),
        this._formBuilder.group({
          militaryStatus: [data['militaryStatus']],
          militaryPlace: [data['militaryPlace']],
          militaryDurationFrom: [data['militaryDurationFrom']],
          militaryDurationTo: [data['militaryDurationTo']],
          militaryStatusSp: [data['militaryStatusSp']],
          militaryPlaceSp: [data['militaryPlaceSp']],
          militaryDurationFromSp: [data['militaryDurationFromSp']],
          militaryDurationToSp: [data['militaryDurationToSp']],
        }),
        this._formBuilder.group({
          significantCurrentSickness: [data['significantCurrentSickness']],
          surgeryPastOrFuture: [data['surgeryPastOrFuture']],
          australiaFamilyRelation: [data['australiaFamilyRelation']],
          australiaLivingState: [data['australiaLivingState']],
          australiaLivingCity: [data['australiaLivingCity']],
          australiaVisaType: [data['australiaVisaType']],
          significantCurrentSicknessSp: [data['significantCurrentSicknessSp']],
          surgeryPastOrFutureSp: [data['surgeryPastOrFutureSp']],
          australiaFamilyRelationSp: [data['australiaFamilyRelationSp']],
          australiaLivingStateSp: [data['australiaLivingStateSp']],
          australiaLivingCitySp: [data['australiaLivingCitySp']],
          australiaVisaTypeSp: [data['australiaVisaTypeSp']],
        })
      ])
    });
  }

  ngOnInit() {
    this.translate.use('en');

    this.appDirection.switchDir('ltr');

    this.id=this.route.snapshot.paramMap.get('id');
    this.token=this.route.snapshot.paramMap.get('token');
    
    this.mainServ.APIServ.get("forms/" + this.id,this.token).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.setFormGroupe(data);
        // this.formData = data;
        this.loder = true;
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });



    // this.degreesFormArray = this.formArray.get([2, 'degrees']) as FormArray;
    // this.degreesSpouseFormArray = this.formArray.get([2, 'degreesSpouse']) as FormArray;
    // this.worksFormArray = this.formArray.get([3, 'works']);
    // this.worksSpouseFormArray = this.formArray.get([3, 'worksSpouse']);


    // this.addDegree();
    // this.addWork();
    // this.addForm()
    // console.log(this.formGroup, this.formArray);

  }

  // createDegree(): FormGroup {
  //   return this._formBuilder.group({
  //     eduLevel: [data['nameFarsi'], Validators.required],
  //     field: [data['nameFarsi'], Validators.required],
  //     university: [data['nameFarsi'], Validators.required],
  //     eduPlace: [data['nameFarsi'], Validators.required],
  //     yearOfGrad: [data['nameFarsi'], Validators.required],
  //   });
  // }
  // createWork(): FormGroup {
  //   return this._formBuilder.group({
  //     ralatedStudy: [data['nameFarsi'], Validators.required],
  //     fieldActivity: [data['nameFarsi'], Validators.required],
  //     insurance: [data['nameFarsi'], Validators.required],
  //     year: [data['nameFarsi'], Validators.required],
  //   });
  // }

  // addDegree(): void {
  //   (this.formArray.get([2, 'degrees']) as FormArray).push(this.createDegree());
  // }
  // addSpouseDegree(): void {
  //   (this.formArray.get([2, 'degreesSpouse']) as FormArray).push(this.createDegree());
  // }
  // addWork(): void {
  //   (this.formArray.get([3, 'works']) as FormArray).push(this.createWork());
  // }
  // addSpouseWork(): void {
  //   (this.formArray.get([3, 'worksSpouse']) as FormArray).push(this.createWork());
  // }
  // removeDegree(index: number): void {
  //   (this.formArray.get([2, 'degrees']) as FormArray).removeAt(index);
  // }
  // removeSpouseDegree(index: number): void {
  //   (this.formArray.get([2, 'degreesSpouse']) as FormArray).removeAt(index);
  // }
  // removeWork(index: number): void {
  //   (this.formArray.get([3, 'works']) as FormArray).removeAt(index);
  // }
  // removeSpouseWork(index: number): void {
  //   (this.formArray.get([3, 'worksSpouse']) as FormArray).removeAt(index);
  // }

  editForm() {
    var customArray = { "formArray": [{ "nameFarsi": "anas", "surnameFarsi": "alazmeh", "nameEnglish": "anas", "surnameEnglish": "alazmeh", "email": "world.of.anas.95@gmail.com", "mobileNo": "222222222", "lLandlinePhoneNo": "3213213123", "maritalStatus": "married", "numberOfChildren": 0, "dateOfBirthPer": "1995-06-24T21:00:00.000Z", "skypeID": "313113113", "residentialAddressEnglish": "Damas", "residentialAddressFarsi": "damas", "nameFarsiSp": "test", "surnameFarsiSp": "test2", "nameEnglishSp": "test", "surnameEnglishSp": "Test2", "emailSp": "a33@a.com", "mobileNoSp": "1111111", "lLandlinePhoneNoSp": "3211312", "maritalStatusSp": "married", "numberOfChildrenSp": 0, "dateOfBirthPerSp": "1993-11-10T22:00:00.000Z", "skypeIDSp": "22131", "residentialAddressEnglishSp": "Damas", "residentialAddressFarsiSp": "damas" }, { "goodEnglish": "Excellent", "writingEn": 10, "listeningEn": 20, "readingEn": 30, "speakingEn": 40, "overallEn": 50, "goodEnglishSp": "Good", "writingEnSp": 50, "listeningEnSp": 40, "readingEnSp": 30, "speakingEnSp": 50, "overallEnSp": 70 }, { "assocField": "assoc", "assocUniversity": "adasd", "assocCityOfUniversity": "asdad", "assocYearOfGraduation": "1993", "bacField": "bac", "bacUniversity": "asdas", "bacCityOfUniversity": "asdasd", "bacYearOfGraduation": "1992", "masterField": "master", "masterUniversity": "asdasd", "masterCityOfUniversity": "qwqeq", "masterYearOfGraduation": "1995", "PHDField": "PHD", "PHDUniversity": "qweqwe", "PHDCityOfUniversity": "qweqe", "PHDYearOfGraduation": "1993", "assocFieldSp": "assocSp", "assocUniversitySp": "zxczc", "assocCityOfUniversitySp": "zxczxc", "assocYearOfGraduationSp": "2000", "bacFieldSp": "bacSp", "bacUniversitySp": "asad", "bacCityOfUniversitySp": "xzczxc", "bacYearOfGraduationSp": "1999", "masterFieldSp": "masterSp", "masterUniversitySp": "qwqwq", "masterCityOfUniversitySp": "wewww", "masterYearOfGraduationSp": "1993", "PHDFieldSp": "PHDSp", "PHDUniversitySp": "dsssssss", "PHDCityOfUniversitySp": "fddddddd", "PHDYearOfGraduationSp": "1993" }, { "fieldOfWorking": "Fieeeeeeeeeeeld", "relatedEdYearsPaid": 20, "relatedEdYearsNonPaid": 30, "nonRelatedEdYearsPaid": 40, "nonRelatedEdYearsNonPaid": 50, "fieldOfWorkingSp": "sadas", "relatedEdYearsPaidSp": 10, "relatedEdYearsNonPaidSp": 20, "nonRelatedEdYearsPaidSp": 30, "nonRelatedEdYearsNonPaidSp": 50 }, { "militaryStatus": "Exemption", "militaryPlace": "dams", "militaryDurationFrom": "1993-01-03T22:00:00.000Z", "militaryDurationTo": "1993-12-17T22:00:00.000Z", "militaryStatusSp": "Finished", "militaryPlaceSp": "Damas", "militaryDurationFromSp": "1993-04-08T21:00:00.000Z", "militaryDurationToSp": "1993-09-18T21:00:00.000Z" }, { "significantCurrentSickness": "qwe", "surgeryPastOrFuture": "asd", "australiaFamilyRelation": "zxc", "australiaLivingState": "qwe1", "australiaLivingCity": "asd2", "australiaVisaType": "Citizen", "significantCurrentSicknessSp": "fghf", "surgeryPastOrFutureSp": "dfdgdg", "australiaFamilyRelationSp": "cvbcb", "australiaLivingStateSp": "sdfs", "australiaLivingCitySp": "cccccc", "australiaVisaTypeSp": "Temporary Res." }] }

    this.sendArray = {}
    var key;
    this.formGroup.value['formArray'].forEach(element => {
      for (key in element) {

        this.sendArray[key] = element[key];
      }
    });
    this.mainServ.APIServ.patch("forms/" + this.id, this.sendArray).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
      alert("editeForm")
      // this.mainServ.globalServ.goTo("partner")
    }
  })
  console.log(this.sendArray);
}

}
