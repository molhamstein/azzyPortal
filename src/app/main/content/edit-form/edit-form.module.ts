import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { EditFormComponent } from './edit-form.component';

const routes = [
  {
      path     : 'edit-form/:id',
      component: EditFormComponent
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditFormComponent],
  exports     : [
    EditFormComponent
  ]
})
export class EditFormModule { }
