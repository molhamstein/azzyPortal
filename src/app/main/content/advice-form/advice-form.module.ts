import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { AdviceFormComponent } from './advice-form.component';

const routes = [
  {
      path     : 'addForm',
      component: AdviceFormComponent
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes,{useHash: true})
  ],
  declarations: [AdviceFormComponent],
  exports     : [
    AdviceFormComponent
  ]
})
export class AdviceFormModule { }
