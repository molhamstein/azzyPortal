import { FuseConfigService } from './../../../../core/services/config.service';
import { MainService } from './../../../../core/services/main.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../languageFiles/en';
import { locale as persian } from '../../languageFiles/fa';
import { TranslateService } from '@ngx-translate/core';
import { AppDirectionService } from '../../../../app-direction.service';
import { FuseTranslationLoaderService } from '../../../../core/services/translation-loader.service';


@Component({
  selector: 'app-show-form',
  templateUrl: './show-form.component.html',
  styleUrls: ['./show-form.component.scss']
})
export class ShowFormComponent implements OnInit {

  constructor(
    private translate: TranslateService,
    private appDirection: AppDirectionService,
    private translationLoader: FuseTranslationLoaderService,
    private route: ActivatedRoute,
    private mainServ: MainService,
    private fuseConfig: FuseConfigService
  ) {
    this.translationLoader.loadTranslations(english, persian);
    this.fuseConfig.setSettings({
      layout: {
        navigation: 'none',
        toolbar: 'below',
        footer: 'none'
      }
    });

  }
  form: any = {};

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

  eduLevels = [
    {
      label: "assoc",
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
      label: "bac",
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
      label: "master",
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
      label: "PHD",
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

  years = []

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

  militaryFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_4.PLACE',
      value: ['militaryPlace', 'militaryPlaceSp'],
      icon: 'book',
      isInput: true
    },
    {
      viewValue: 'Add_Edit_Form.STEP_4.FROM',
      value: ['militaryDurationFrom', 'militaryDurationFromSp'],
      icon: 'book',
      isInput: false
    }, {
      viewValue: 'Add_Edit_Form.STEP_4.TO',
      value: ['militaryDurationTo', 'militaryDurationToSp'],
      icon: 'book',
      isInput: false
    }
  ]

  visaType = [
    {
      viewValue: 'Add_Edit_Form.STEP_5.CITIZEN',
      value: 'Citizen'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.PERMANENTRES',
      value: 'Permanent Res.'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.TEMPORARYRES',
      value: 'Temporary Res.'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.STUDENTASSYLUM',
      value: 'Student-Assylum'
    },
  ]

  australiaFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_5.SIGNIFICANT',
      value: ['significantCurrentSickness', 'significantCurrentSicknessSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.SURGERY',
      value: ['surgeryPastOrFuture', 'surgeryPastOrFutureSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.RELATION',
      value: ['australiaFamilyRelation', 'australiaFamilyRelationSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.LIVINGSTATE',
      value: ['australiaLivingState', 'australiaLivingStateSp'],
      icon: 'book'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_5.LIVINGCITY',
      value: ['australiaLivingCity', 'australiaLivingCitySp'],
      icon: 'book'
    },

  ]


  notesFields = [
    {
      viewValue: 'Add_Edit_Form.STEP_6.TBCLIENT',
      value: ['textBoxClient'],
      icon: 'note'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.TBADMIN',
      value: ['textBoxAdmin'],
      icon: 'note'
    },
    {
      viewValue: 'Add_Edit_Form.STEP_6.TBNOTES',
      value: ['textBoxNotes'],
      icon: 'note'
    },
  ]

  ngOnInit() {
    this.translate.use('en');

    this.appDirection.switchDir('ltr');
    this.form.FirstName = "Johnny";

    for (var index = 0; index <= 100; index++) {
      this.years.push(1960 + index);
    }


    var id = this.route.snapshot.paramMap.get('id');

    this.mainServ.APIServ.get("forms/" + id).subscribe((data: any) => {
      if (this.mainServ.APIServ.getErrorCode() == 0) {
        this.form = data;
      }
      else if (this.mainServ.APIServ.getErrorCode() == 400) {

      }
      else {
        this.mainServ.globalServ.somthingError();
      }

    });



  }


  goBack() {
    this.mainServ.globalServ.goTo(this.mainServ.getBackUrl())
  }
}
