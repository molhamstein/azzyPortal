import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { EditClientFormComponent } from './editClient-form.component';

const routes = [
  {
      path     : 'edit-client/:id/:token',
      component: EditClientFormComponent
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditClientFormComponent],
  exports     : [
    EditClientFormComponent
  ]
})
export class EditClientFormModule { }
