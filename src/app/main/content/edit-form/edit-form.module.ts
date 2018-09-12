import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { EditFormComponent } from './edit-form.component';

const routes = [
  {
    path: 'edit-form/:id',
    component: EditFormComponent,
    canActivate: [AuthGuardService]

  },

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes,{useHash: true})
  ],
  declarations: [EditFormComponent],
  exports: [
    EditFormComponent
  ]
})
export class EditFormModule { }
