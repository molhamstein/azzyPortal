import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '../../../core/services/translation-loader.service';
import { FuseConfigService } from '../../../core/services/config.service';

import { locale as english } from './i18n/en';
import { locale as persian } from './i18n/fa';

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

  maritalStatusList = [
    {
      viewValue: 'ADVICE_FORM.STEP_0.MARRIED',
      value: 'married'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_0.SEPARETED',
      value: 'separated'
    },
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
      value: 'nevermarried'
    },
  ];
  englishLevels = [
    {
      viewValue: 'ADVICE_FORM.STEP_1.EXCELLENT',
      value: 'excellent'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_1.GOOD',
      value: 'good'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_1.MEDIUM',
      value: 'medium'
    }
  ];
  englishScores = [
    {
      viewValue: 'ًWriting',
      value: ['writingScoreFormCtrl', 'writingScore_SpouseFormCtrl'],
      icon: 'edit'
    },
    {
      viewValue: 'Listening',
      value: ['listeningScoreFormCtrl', 'listeningScore_SpouseFormCtrl'],
      icon: 'hearing'
    },
    {
      viewValue: 'Reading',
      value: ['readingScoreFormCtrl', 'readingScore_SpouseFormCtrl'],
      icon: 'local_library'
    },
    {
      viewValue: 'Speaking',
      value: ['speakingScoreFormCtrl', 'speakingScore_SpouseFormCtrl'],
      icon: 'record_voice_over'
    },
    {
      viewValue: 'Overall',
      value: ['overallScoreFormCtrl', 'overallScore_SpouseFormCtrl'],
      icon: 'done_all'
    }
  ];

  eduLevels = [
    {
      viewValue: 'ADVICE_FORM.STEP_2.ASSISTANT',
      value: 'assistant'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_2.UNDER_GRAD',
      value: 'undergraduate'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_2.MASTER',
      value: 'master'
    },
    {
      viewValue: 'ADVICE_FORM.STEP_2.DOC',
      value: 'doctoral'
    }
  ];
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
    private _formBuilder: FormBuilder) {
    this.fuseSettings = this.fuseConfig.settings;
    this.fuseSettings.optionsBtn = 'none';
    this.fuseSettings.layout.navigation = 'none';
    this.fuseSettings.layout.toolbar = 'none';
    this.fuseSettings.layout.footer = 'none';

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
    this.translate.use('fr');

    this.appDirection.switchDir('rtl');

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
          firstNameFormCtrl: ['', Validators.required],
          lastNameFormCtrl: ['', Validators.required],
          emailFormCtrl: ['', [Validators.required, Validators.email]],
          mobileFormCtrl: ['', Validators.required],
          maritalStatusFormCtrl: ['', Validators.required],
          childrenNumFormCtrl: ['', Validators.required],
          birthDateFormCtrl: ['', Validators.required],
          skypeFormCtrl: ['', Validators.required],
          firstName_SpouseFormCtrl: ['', Validators.required],
          lastName_SpouseFormCtrl: ['', Validators.required],
          birthDate_SpouseFormCtrl: ['', Validators.required]
        }),
        this._formBuilder.group({
          englishLevelFormCtrl: ['', Validators.required],
          writingScoreFormCtrl: ['', Validators.required],
          listeningScoreFormCtrl: ['', Validators.required],
          readingScoreFormCtrl: ['', Validators.required],
          speakingScoreFormCtrl: ['', Validators.required],
          overallScoreFormCtrl: ['', Validators.required],
          englishLevel_SpouseFormCtrl: ['', Validators.required],
          writingScore_SpouseFormCtrl: ['', Validators.required],
          listeningScore_SpouseFormCtrl: ['', Validators.required],
          readingScore_SpouseFormCtrl: ['', Validators.required],
          speakingScore_SpouseFormCtrl: ['', Validators.required],
          overallScore_SpouseFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          degrees: this._formBuilder.array([]),
          degreesSpouse: this._formBuilder.array([]),
        }),
        this._formBuilder.group({
          works: this._formBuilder.array([]),
          worksSpouse: this._formBuilder.array([]),
        })
      ])
    });

    // this.degreesFormArray = this.formArray.get([2, 'degrees']) as FormArray;
    // this.degreesSpouseFormArray = this.formArray.get([2, 'degreesSpouse']) as FormArray;
    // this.worksFormArray = this.formArray.get([3, 'works']);
    // this.worksSpouseFormArray = this.formArray.get([3, 'worksSpouse']);


    this.addDegree();
    this.addWork();
    console.log(this.formGroup, this.formArray);

  }

  createDegree(): FormGroup {
    return this._formBuilder.group({
      eduLevelFormCtrl: ['', Validators.required],
      fieldFormCtrl: ['', Validators.required],
      universityFormCtrl: ['', Validators.required],
      eduPlaceFormCtrl: ['', Validators.required],
      yearOfGradFormCtrl: ['', Validators.required],
    });
  }
  createWork(): FormGroup {
    return this._formBuilder.group({
      ralatedStudyFormCtrl: ['', Validators.required],
      fieldActivityFormCtrl: ['', Validators.required],
      insuranceFormCtrl: ['', Validators.required],
      yearFormCtrl: ['', Validators.required],
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

}
