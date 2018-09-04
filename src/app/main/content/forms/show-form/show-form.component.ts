import { Component, OnInit } from '@angular/core';
import { locale as english } from '../../advice-form/i18n/en'
import { locale as persian } from '../../advice-form/i18n/fa'
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

  ) {
    this.translationLoader.loadTranslations(english, persian);

  }
  form: any = {};

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
  ngOnInit() {
    this.translate.use('en');

    this.appDirection.switchDir('ltr');
    this.form.FirstName = "Johnny";
    
  }

}
