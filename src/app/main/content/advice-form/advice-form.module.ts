import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { AdviceFormComponent } from './advice-form.component';

const routes = [
  {
      path     : 'فرم_درخواست_مشاوره',
      component: AdviceFormComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdviceFormComponent],
  exports     : [
    AdviceFormComponent
  ]
})
export class AdviceFormModule { }
