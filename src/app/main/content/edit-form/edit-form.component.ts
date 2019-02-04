import { DialogServiceService } from './../../../core/services/dialog-service.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../core/services/main.service';
import { element } from 'protractor';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { FuseConfigService } from '../../../core/services/config.service';

import { locale as english } from '../languageFiles/en';
import { locale as persian } from '../languageFiles/fa';

import { AbstractControl, FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AppDirectionService } from '../../../app-direction.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  startDate = new Date(1993, 1, 1);
  form: FormGroup;
  formData: {};
  formErrors: any;
  formGroup: FormGroup;

  total;
  totalSp;
  fuseSettings: any;
  isNonLinear = false;
  isNonEditable = false;

  minDate = new Date(1900, 0, 1);
  maxDate = new Date();

  minDateSp = new Date(1900, 0, 1);
  maxDateSp = new Date();

  sendArray = {}
  loder = false;
  allPayments;
  preAllPayments;
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
      label: "PHD Degree",
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
      fxFlex: 96
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

  notesFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_7.ANYINFO',
      value: ['textBoxClient'],
      icon: 'note'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.TBADMIN',
      value: ['textBoxAdmin'],
      icon: 'note'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.TBNOTES',
      value: ['textBoxNotes'],
      icon: 'note'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.HOWKNOWUS',
      value: ['howKnow'],
      icon: 'note'
    },

  ]

  mainApplicantValue = [
    {
      'value': 'applicant',
      'viewValue': 'Add_Edit_Form.STEP_7.APPLICANT'
    },
    {
      'value': 'spouse',
      'viewValue': 'Add_Edit_Form.STEP_7.SPOUSE'
    }
  ]

  extNotesFields = [
    // {
    //   viewValue: 'Add_Edit_Form.STEP_7.MAINAPPLICATION',
    //   value: ['mainApplicant'],
    //   icon: 'note',
    //   type: 'choose',
    //   arrayValue: [{
    //     'value': 'ssss',
    //     'viewValue': 'eeeee'
    //   }]
    // },
    // {
    //   viewValue: 'Add_Edit_Form.STEP_7.DEPENDANT',
    //   value: ['dependant', 'dependantSp'],
    //   icon: 'note',
    //   type: 'choose',
    //   arrayValue: [
    //     {
    //       'value': 'ssss',
    //       'viewValue': 'eeeee'
    //     }
    //   ]
    // },
    {
      viewValue: 'Add_Edit_Form.STEP_7.OCCUPATIONTOBEASSESSED',
      value: ['occupationToBeAssessed', 'occupationToBeAssessedSp'],
      icon: 'note',
      type: 'input',
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.YEAROFWORKEXPERIENCE',
      value: ['yearsOfWorkExperience', 'yearsOfWorkExperienceSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.ASSESSMENTORGANIZATION',
      value: ['assessmentOrganization', 'assessmentOrganizationSp'],
      icon: 'note',
      type: 'input'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PROFESSIONALINSTALLMENTA',
      value: ['professionalInstallments', 'professionalInstallmentsSp'],
      icon: 'note',
      type: 'number'
    },
  ]


  pintsFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFEDUCATION',
      value: ['pointsFromEducation', 'pointsFromEducationSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFEXPERIENCE',
      value: ['pointsFromWorkExperience', 'pointsFromWorkExperienceSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFSPOUSE',
      value: ['pointsFromSpouse', 'pointsFromSpouseSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFENGLISH',
      value: ['pointsFromEnglishTest', 'pointsFromEnglishTestSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFNAATI',
      value: ['pointsFromNAATITest', 'pointsFromNAATITestSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFSTATE',
      value: ['pointsFromStateSponsorship', 'pointsFromStateSponsorshipSp'],
      icon: 'note',
      type: 'number'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_7.PFFAMILY',
      value: ['pointsFromFamilySponsorship', 'pointsFromFamilySponsorshipSp'],
      icon: 'note',
      type: 'number'
    },


  ]

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

  feeForm
  constructor(
    private translate: TranslateService,
    private appDirection: AppDirectionService,
    private fuseConfig: FuseConfigService,
    private translationLoader: FuseTranslationLoaderService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialogSer: DialogServiceService,
    private mainServ: MainService) {

    for (var index = 0; index <= 100; index++) {
      this.years.push(1960 + index);
    }
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'below',
        footer: 'none'
      }
    });


    this.feeForm = new FormGroup({
      title: new FormControl(""),
      value: new FormControl()
    });

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

          nameFarsiSp: [data['nameFarsiSp']],
          surnameFarsiSp: [data['surnameFarsiSp']],
          nameEnglishSp: [data['nameEnglishSp']],
          surnameEnglishSp: [data['surnameEnglishSp']],
          emailSp: [data['emailSp']],
          mobileNoSp: [data['mobileNoSp']],
          lLandlinePhoneNoSp: [data['lLandlinePhoneNoSp']],
          maritalStatusSp: [data['maritalStatusSp']],
          numberOfChildrenSp: [data['numberOfChildrenSp']],
          dateOfBirthPerSp: [data['dateOfBirthPerSp']],
          skypeIDSp: [data['skypeIDSp']],
          residentialAddressEnglishSp: [data['residentialAddressEnglishSp']],
          residentialAddressFarsiSp: [data['residentialAddressFarsiSp']]
        }),
        this._formBuilder.group({
          goodEnglish: [data['goodEnglish'], Validators.required],
          writingEn: [data['writingEn']],
          listeningEn: [data['listeningEn']],
          readingEn: [data['readingEn']],
          speakingEn: [data['speakingEn']],
          overallEn: [data['overallEn']],
          goodEnglishSp: [data['goodEnglishSp']],
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
          exemptionReason: [data['exemptionReason']],
          militaryStatusSp: [data['militaryStatusSp']],
          militaryPlaceSp: [data['militaryPlaceSp']],
          militaryDurationFromSp: [data['militaryDurationFromSp']],
          militaryDurationToSp: [data['militaryDurationToSp']],
          exemptionReasonSp: [data['exemptionReasonSp']],
        }),
        this._formBuilder.group({
          significantCurrentSickness: [data['significantCurrentSickness']],
          surgeryPastOrFuture: [data['surgeryPastOrFuture']],
          significantCurrentSicknessSp: [data['significantCurrentSicknessSp']],
          surgeryPastOrFutureSp: [data['surgeryPastOrFutureSp']],

        }),
        this._formBuilder.group({
          australiaFamilyRelation: [data['australiaFamilyRelation']],
          australiaLivingState: [data['australiaLivingState']],
          australiaLivingCity: [data['australiaLivingCity']],
          australiaVisaType: [data['australiaVisaType']],
          australiaFamilyRelationSp: [data['australiaFamilyRelationSp']],
          australiaLivingStateSp: [data['australiaLivingStateSp']],
          australiaLivingCitySp: [data['australiaLivingCitySp']],
          australiaVisaTypeSp: [data['australiaVisaTypeSp']],
        }),
        this._formBuilder.group({
          textBoxClient: [data['textBoxClient']],
          textBoxAdmin: [data['textBoxAdmin']],
          textBoxNotes: [data['textBoxNotes']],
          howKnow: [data['howKnow']],
          mainApplicant: [data['mainApplicant']],
          // mainApplicantSp: [data['mainApplicantSp']],
          // dependant: [data['dependant']],
          // dependantSp: [data['dependantSp']],
          occupationToBeAssessed: [data['occupationToBeAssessed']],
          occupationToBeAssessedSp: [data['occupationToBeAssessedSp']],
          yearsOfWorkExperience: [data['yearsOfWorkExperience']],
          yearsOfWorkExperienceSp: [data['yearsOfWorkExperienceSp']],
          assessmentOrganization: [data['assessmentOrganization']],
          assessmentOrganizationSp: [data['assessmentOrganizationSp']],
          professionalInstallments: [data['professionalInstallments']],
          professionalInstallmentsSp: [data['professionalInstallmentsSp']],
          professionalTotal: [data['professionalTotal']],
          pointsFromEducation: [data['pointsFromEducation']],
          pointsFromEducationSp: [data['pointsFromEducationSp']],
          pointsFromWorkExperience: [data['pointsFromWorkExperience']],
          pointsFromWorkExperienceSp: [data['pointsFromWorkExperienceSp']],
          pointsFromSpouse: [data['pointsFromSpouse']],
          pointsFromSpouseSp: [data['pointsFromSpouseSp']],
          pointsFromEnglishTest: [data['pointsFromEnglishTest']],
          pointsFromEnglishTestSp: [data['pointsFromEnglishTestSp']],
          pointsFromNAATITest: [data['pointsFromNAATITest']],
          pointsFromNAATITestSp: [data['pointsFromNAATITestSp']],
          pointsFromStateSponsorship: [data['pointsFromStateSponsorship']],
          pointsFromStateSponsorshipSp: [data['pointsFromStateSponsorshipSp']],
          pointsFromFamilySponsorship: [data['pointsFromFamilySponsorship']],
          pointsFromFamilySponsorshipSp: [data['pointsFromFamilySponsorshipSp']],
          totalPoints: [data['totalPoints']],
          totalPointsSp: [data['totalPointsSp']]
        })
      ])
    });
  }


  ngOnInit() {
    // this.translate.use('en');

    // this.appDirection.switchDir('ltr');
    this.mainServ.loaderSer.display(true);
    var id = this.route.snapshot.paramMap.get('id');
    this.mainServ.APIServ.get("forms/" + id).subscribe((data: any) => {
      this.mainServ.loaderSer.display(false);
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.setFormGroupe(data);
        this.formData = data;
        this.loder = true;
        this.total = data['totalPoints'];
        this.totalSp = data['totalPointsSp'];
        this.mainServ.loaderSer.display(true);
        this.mainServ.APIServ.get("forms/" + id + "/fees").subscribe((data: any) => {
          this.mainServ.loaderSer.display(false);
          if (this.mainServ.APIServ.getErrorCode() == 0) {
            this.allPayments = data;
            if (this.allPayments.length == 0) {
              console.log("from cocckies")
              this.preAllPayments = this.mainServ.loginServ.getBills();
              if (this.preAllPayments != "")
                this.preAllPayments = JSON.parse(this.preAllPayments);
              console.log(JSON.stringify(this.preAllPayments));
            }
            this.allPayments.forEach(element => {
              this.totalInstallments += element.value
            });
          }
        })


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

  changeTotal() {
    this.total = this.formGroup.value['formArray'][7]['pointsFromEducation'] +
      this.formGroup.value['formArray'][7]['pointsFromWorkExperience'] +
      this.formGroup.value['formArray'][7]['pointsFromSpouse'] +
      this.formGroup.value['formArray'][7]['pointsFromEnglishTest'] +
      this.formGroup.value['formArray'][7]['pointsFromNAATITest'] +
      this.formGroup.value['formArray'][7]['pointsFromStateSponsorship'] +
      this.formGroup.value['formArray'][7]['pointsFromFamilySponsorship']
  }

  changeTotalSp() {
    this.totalSp = this.formGroup.value['formArray'][7]['pointsFromEducationSp'] +
      this.formGroup.value['formArray'][7]['pointsFromWorkExperienceSp'] +
      this.formGroup.value['formArray'][7]['pointsFromSpouseSp'] +
      this.formGroup.value['formArray'][7]['pointsFromEnglishTestSp'] +
      this.formGroup.value['formArray'][7]['pointsFromNAATITestSp'] +
      this.formGroup.value['formArray'][7]['pointsFromStateSponsorshipSp'] +
      this.formGroup.value['formArray'][7]['pointsFromFamilySponsorshipSp']
  }

  editForm() {
    var customArray = { "formArray": [{ "nameFarsi": "anas", "surnameFarsi": "alazmeh", "nameEnglish": "anas", "surnameEnglish": "alazmeh", "email": "world.of.anas.95@gmail.com", "mobileNo": "222222222", "lLandlinePhoneNo": "3213213123", "maritalStatus": "married", "numberOfChildren": 0, "dateOfBirthPer": "1995-06-24T21:00:00.000Z", "skypeID": "313113113", "residentialAddressEnglish": "Damas", "residentialAddressFarsi": "damas", "nameFarsiSp": "test", "surnameFarsiSp": "test2", "nameEnglishSp": "test", "surnameEnglishSp": "Test2", "emailSp": "a33@a.com", "mobileNoSp": "1111111", "lLandlinePhoneNoSp": "3211312", "maritalStatusSp": "married", "numberOfChildrenSp": 0, "dateOfBirthPerSp": "1993-11-10T22:00:00.000Z", "skypeIDSp": "22131", "residentialAddressEnglishSp": "Damas", "residentialAddressFarsiSp": "damas" }, { "goodEnglish": "Excellent", "writingEn": 10, "listeningEn": 20, "readingEn": 30, "speakingEn": 40, "overallEn": 50, "goodEnglishSp": "Good", "writingEnSp": 50, "listeningEnSp": 40, "readingEnSp": 30, "speakingEnSp": 50, "overallEnSp": 70 }, { "assocField": "assoc", "assocUniversity": "adasd", "assocCityOfUniversity": "asdad", "assocYearOfGraduation": "1993", "bacField": "bac", "bacUniversity": "asdas", "bacCityOfUniversity": "asdasd", "bacYearOfGraduation": "1992", "masterField": "master", "masterUniversity": "asdasd", "masterCityOfUniversity": "qwqeq", "masterYearOfGraduation": "1995", "PHDField": "PHD", "PHDUniversity": "qweqwe", "PHDCityOfUniversity": "qweqe", "PHDYearOfGraduation": "1993", "assocFieldSp": "assocSp", "assocUniversitySp": "zxczc", "assocCityOfUniversitySp": "zxczxc", "assocYearOfGraduationSp": "2000", "bacFieldSp": "bacSp", "bacUniversitySp": "asad", "bacCityOfUniversitySp": "xzczxc", "bacYearOfGraduationSp": "1999", "masterFieldSp": "masterSp", "masterUniversitySp": "qwqwq", "masterCityOfUniversitySp": "wewww", "masterYearOfGraduationSp": "1993", "PHDFieldSp": "PHDSp", "PHDUniversitySp": "dsssssss", "PHDCityOfUniversitySp": "fddddddd", "PHDYearOfGraduationSp": "1993" }, { "fieldOfWorking": "Fieeeeeeeeeeeld", "relatedEdYearsPaid": 20, "relatedEdYearsNonPaid": 30, "nonRelatedEdYearsPaid": 40, "nonRelatedEdYearsNonPaid": 50, "fieldOfWorkingSp": "sadas", "relatedEdYearsPaidSp": 10, "relatedEdYearsNonPaidSp": 20, "nonRelatedEdYearsPaidSp": 30, "nonRelatedEdYearsNonPaidSp": 50 }, { "militaryStatus": "Exemption", "militaryPlace": "dams", "militaryDurationFrom": "1993-01-03T22:00:00.000Z", "militaryDurationTo": "1993-12-17T22:00:00.000Z", "militaryStatusSp": "Finished", "militaryPlaceSp": "Damas", "militaryDurationFromSp": "1993-04-08T21:00:00.000Z", "militaryDurationToSp": "1993-09-18T21:00:00.000Z" }, { "significantCurrentSickness": "qwe", "surgeryPastOrFuture": "asd", "australiaFamilyRelation": "zxc", "australiaLivingState": "qwe1", "australiaLivingCity": "asd2", "australiaVisaType": "Citizen", "significantCurrentSicknessSp": "fghf", "surgeryPastOrFutureSp": "dfdgdg", "australiaFamilyRelationSp": "cvbcb", "australiaLivingStateSp": "sdfs", "australiaLivingCitySp": "cccccc", "australiaVisaTypeSp": "Temporary Res." }] }
    var mainThis = this;
    this.sendArray = {}
    var key;
    this.formGroup.value['formArray'][7].totalPoints = this.total
    this.formGroup.value['formArray'][7].totalPointsSp = this.totalSp
    this.formGroup.value['formArray'].forEach(element => {
      for (key in element) {
        if (element[key] != "" && element[key] != null)
          this.sendArray[key] = element[key];
      }
    });

    this.dialogSer.confirmationMessage('Do you want to edit the form ', "forms/" + this.formData['id'], this.sendArray, false, function () {
      // mainThis.mainServ.globalServ.goTo(this.mainServ.getBackUrl())
      mainThis.mainServ.globalServ.goTo(mainThis.mainServ.getBackUrl())
    }, 'patch')


    // this.mainServ.APIServ.patch("forms/" + this.formData['id'], this.sendArray).subscribe((data: any) => {
    //   if (this.mainServ.APIServ.getErrorCode() == 0) {
    //     alert("editeForm")
    //   }
    // })
    console.log(this.sendArray);
  }

  goBack() {
    this.mainServ.globalServ.goTo(this.mainServ.getBackUrl())
  }


  @ViewChild('f') myNgForm;

  reset() {
    this.myNgForm.resetForm();
  }
  totalInstallments = 0;


  saveTemplate() {
    var tempPayments = []
    this.allPayments.forEach(element => {
      tempPayments.push({ "value": element.value, "title": element.title });
    });

    this.mainServ.loginServ.setBills(JSON.stringify(tempPayments));
  }
  submitPaid(index) {
    this.mainServ.loaderSer.display(true);
    var sendData = this.preAllPayments[index];
    sendData['formId'] = this.formData['id'];
    this.mainServ.APIServ.post("fees", sendData).subscribe((data: any) => {
      this.mainServ.loaderSer.display(false);
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.allPayments.push(data);
        this.preAllPayments.splice(index, 1);
        this.totalInstallments = 0;
        this.allPayments.forEach(element => {
          this.totalInstallments += element.value
        });
      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });
  }
  addPaid() {
    this.mainServ.loaderSer.display(true);
    var sendData = this.feeForm.value;
    sendData['formId'] = this.formData['id'];
    this.mainServ.APIServ.post("fees", sendData).subscribe((data: any) => {
      this.mainServ.loaderSer.display(false);
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.allPayments.push(data);
        this.reset();
        this.totalInstallments = 0;
        this.allPayments.forEach(element => {
          this.totalInstallments += element.value
        });
      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });
  }

  canselPaid(index) {
    this.preAllPayments.splice(index, 1);

  }

  delPaid(id, index) {
    this.mainServ.loaderSer.display(true);
    this.mainServ.APIServ.delete("fees/" + id).subscribe((data: any) => {
      this.mainServ.loaderSer.display(false);
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.allPayments.splice(index, 1);
        this.totalInstallments = 0;
        this.allPayments.forEach(element => {
          this.totalInstallments += element.value
        });
      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });

  }

}
