import { AuthGuardService } from './../../../core/services/auth-guard-service.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { SharedModule } from '../../../core/modules/shared.module';

import { cancelAppointmentComponent } from './cancel-appointment.component';

const routes = [
  {
    path: 'cancel-appointment/:id/:token',
    component: cancelAppointmentComponent,
    canActivate: [AuthGuardService]

  },

];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [cancelAppointmentComponent],
  exports: [
    cancelAppointmentComponent
  ]
})
export class cancelAppointmentModule { }
